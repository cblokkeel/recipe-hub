import { v, Infer } from 'convex/values';
import { action, internalAction, mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import { recipeExtractor } from './lib/recipeExtractor';
import { api, internal } from './_generated/api';
import { getOrCreateOpenAIClient } from './ai/client';
import { recipeGenerator } from './lib/recipeGenerator';

const baseRecipeFields = {
	name: v.string(),
	ingredients: v.array(v.string()),
	instructions: v.array(v.string())
};

export const recipeSchema = v.object({
	...baseRecipeFields,
	user_id: v.id('users'),
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

		return recipeId;
	}
});

export const recipeByUser = query({
	args: {},
	async handler(ctx, _) {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return [];
		}

		const recipes = await ctx.db
			.query('recipes')
			.withIndex('by_user', (q) => q.eq('user_id', userId))
			.collect();

		return recipes;
	}
});

export const getRecipeById = query({
	args: {
		id: v.id('recipes')
	},
	async handler(ctx, args) {
		const recipe = await ctx.db.get(args.id);
		if (!recipe) {
			throw new Error('Recipe not found');
		}
		return recipe;
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
