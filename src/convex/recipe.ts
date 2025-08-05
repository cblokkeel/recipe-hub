import { v, Infer } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

const baseRecipeFields = {
	name: v.string(),
	ingredients: v.array(v.string()),
	instructions: v.array(v.string()),
	description: v.optional(v.string())
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
