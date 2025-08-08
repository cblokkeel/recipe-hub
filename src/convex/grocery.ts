import { Infer, v } from 'convex/values';
import { action, mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import { Id } from './_generated/dataModel';
import { groceryGenerator } from './lib/groceryGenerator';
import { api } from './_generated/api';

const baseGroceryFields = {
	groceries: v.array(v.string())
};

export const grocerySchema = v.object({
	...baseGroceryFields,
	user_id: v.id('users'),
	recipes: v.array(v.id('recipes')),
	created_at: v.string()
});

export type Grocery = Infer<typeof grocerySchema> & { _id: string };

export const createGrocery = mutation({
	args: {
		grocery: grocerySchema
	},
	async handler(ctx, args) {
		const insertedGroceryId = await ctx.db.insert('groceries', args.grocery);
		return insertedGroceryId;
	}
});

export const getGroceryById = query({
	args: {
		id: v.id('groceries')
	},
	async handler(ctx, args) {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('User not authenticated');
		}

		const grocery = await ctx.db.get(args.id);
		if (!grocery || grocery.user_id !== userId) {
			throw new Error('Grocery not found or access denied');
		}
		return grocery;
	}
});

export const createGroceryFromRecipes = action({
	args: {
		recipes: v.array(v.id('recipes'))
	},
	async handler(ctx, args) {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('User not authenticated');
		}

		const userRecipes = await ctx.runQuery(api.recipe.recipeByUser, {});

		const selectedRecipes = userRecipes.filter((recipe) =>
			args.recipes.includes(recipe._id as Id<'recipes'>)
		);

		const groceryList = await groceryGenerator.generateGroceryListFromRecipes(selectedRecipes);

		const newGrocery = {
			groceries: groceryList,
			user_id: userId,
			recipes: args.recipes,
			created_at: new Date().toISOString()
		};

		const groceryId: Id<'groceries'> = await ctx.runMutation(api.grocery.createGrocery, {
			grocery: newGrocery
		});

		return groceryId;
	}
});
