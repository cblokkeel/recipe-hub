import { v, Infer } from 'convex/values';
import {
	action,
	internalAction,
	internalMutation,
	internalQuery,
	mutation,
	query
} from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import { recipeExtractor } from './lib/recipeExtractor';
import { api, internal } from './_generated/api';
import { getOrCreateOpenAIClient } from './ai/client';
import { recipeGenerator } from './lib/recipeGenerator';
import { recipeCoverGenerator } from './lib/recipeCoverGenerator';
import { Id } from './_generated/dataModel';

const baseRecipeFields = {
	name: v.string(),
	ingredients: v.array(v.string()),
	instructions: v.array(v.string())
};

export const recipeSchema = v.object({
	...baseRecipeFields,
	user_id: v.id('users'),
	cover_id: v.optional(v.id('_storage')),
	created_at: v.string()
});

export type Recipe = Infer<typeof recipeSchema> & { _id: string };

export const createRecipe = mutation({
	args: {
		recipe: v.object(baseRecipeFields)
	},
	async handler(ctx, args) {
		const userId = await getAuthUserId(ctx);

		if (!userId) {
			throw new Error('User not authenticated');
		}

		const recipe = {
			...args.recipe,
			user_id: userId,
			created_at: new Date().toISOString()
		};

		const recipeId = await ctx.db.insert('recipes', recipe);

		ctx.scheduler.runAfter(0, internal.recipe.generateRecipeCover, {
			recipeId: recipeId
		});

		return recipeId;
	}
});

export const recipeByUser = query({
	args: {},
	async handler(ctx, _): Promise<(Recipe & { coverUrl?: string })[]> {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return [];
		}

		const recipes = await ctx.db
			.query('recipes')
			.withIndex('by_user', (q) => q.eq('user_id', userId))
			.collect();

		const recipesWithCoverUrl = await Promise.all(
			recipes.map(async (recipe) => {
				if (!recipe.cover_id) {
					return {
						...recipe,
						coverUrl: undefined
					};
				}

				const coverUrl = await ctx.storage.getUrl(recipe.cover_id);
				return {
					...recipe,
					coverUrl: coverUrl ?? undefined
				};
			})
		);

		return recipesWithCoverUrl;
	}
});

export const getRecipeById = query({
	args: {
		id: v.id('recipes')
	},
	async handler(ctx, args) {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('User not authenticated');
		}
		const recipe = await ctx.db.get(args.id);
		if (!recipe || recipe.user_id !== userId) {
			throw new Error('Recipe not found or access denied');
		}
		let coverUrl;
		if (recipe.cover_id) {
			coverUrl = await ctx.storage.getUrl(recipe.cover_id);
		}

		return {
			...recipe,
			coverUrl
		};
	}
});

export const internalGetRecipeById = internalQuery({
	args: {
		id: v.id('recipes')
	},
	async handler(ctx, args) {
		const recipe = await ctx.db.get(args.id);
		return recipe;
	}
});

export const getRecipeCoverUrl = query({
	args: {
		recipeId: v.id('recipes')
	},
	async handler(ctx, args) {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('User not authenticated');
		}

		const recipe = await ctx.db.get(args.recipeId);
		if (!recipe || recipe.user_id !== userId) {
			throw new Error('Recipe not found or access denied');
		}

		if (!recipe.cover_id) {
			return null;
		}

		const coverUrl = await ctx.storage.getUrl(recipe.cover_id);
		return coverUrl;
	}
});

export const generateRecipeFromText = internalAction({
	args: {
		text: v.string()
	},
	async handler(_, args) {
		const openai = getOrCreateOpenAIClient();
		const recipe = await recipeGenerator.generateRecipeFromText(args.text, openai);

		return recipe;
	}
});

export const importRecipeByURL = action({
	args: {
		url: v.string()
	},
	async handler(ctx, args) {
		const userId = await getAuthUserId(ctx);

		if (!userId) {
			throw new Error('User not authenticated');
		}

		const extractedRecipe = await recipeExtractor.extractByURL(args.url);
		const res = await ctx.runAction(internal.recipe.generateRecipeFromText, {
			text: extractedRecipe
		});

		await ctx.runMutation(api.recipe.createRecipe, {
			recipe: {
				name: res.title,
				ingredients: res.ingredients,
				instructions: res.instructions
			}
		});
	}
});

export const updateRecipeCover = mutation({
	args: {
		recipeId: v.id('recipes'),
		coverStorageId: v.id('_storage')
	},
	async handler(ctx, args) {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('User not authenticated');
		}

		const recipe = await ctx.db.get(args.recipeId);
		if (!recipe || recipe.user_id !== userId) {
			throw new Error('Recipe not found or access denied');
		}

		await ctx.runMutation(internal.recipe.internalUpdateRecipeCover, {
			recipeId: args.recipeId,
			coverStorageId: args.coverStorageId
		});

		return args.recipeId;
	}
});

export const internalUpdateRecipeCover = internalMutation({
	args: {
		recipeId: v.id('recipes'),
		coverStorageId: v.id('_storage')
	},
	async handler(ctx, args) {
		const recipe = await ctx.db.get(args.recipeId);
		if (!recipe) {
			throw new Error('Recipe not found');
		}

		await ctx.db.patch(args.recipeId, {
			cover_id: args.coverStorageId
		});

		return args.recipeId;
	}
});

export const generateRecipeCover = internalAction({
	args: {
		recipeId: v.id('recipes')
	},
	async handler(ctx, args) {
		const recipe = await ctx.runQuery(internal.recipe.internalGetRecipeById, {
			id: args.recipeId
		});

		console.log('alo', recipe);

		if (!recipe) {
			throw new Error('Recipe not found');
		}

		console.log('super..');

		const openai = getOrCreateOpenAIClient();
		const recipeCoverUrl = await recipeCoverGenerator.generateCoverFromRecipe(recipe, openai);

		console.log('recipeCoverUrl', recipeCoverUrl);

		if (!recipeCoverUrl) {
			throw new Error('Failed to generate recipe cover image');
		}

		const response = await fetch(recipeCoverUrl);
		const image = await response.blob();
		const storageId: Id<'_storage'> = await ctx.storage.store(image);

		await ctx.runMutation(internal.recipe.internalUpdateRecipeCover, {
			recipeId: args.recipeId,
			coverStorageId: storageId
		});
	}
});
