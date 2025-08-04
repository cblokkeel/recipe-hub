import { v, Infer } from 'convex/values';
import { mutation } from './_generated/server';
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

export type Recipe = Infer<typeof recipeSchema>;

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
