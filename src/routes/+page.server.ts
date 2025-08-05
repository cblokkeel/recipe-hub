import { createConvexAuthHandlers } from '@mmailaender/convex-auth-svelte/sveltekit/server';
import type { PageServerLoad } from './create-recipe/manual/$types';
import { api } from '../convex/_generated/api';

export const load: PageServerLoad = async (event) => {
	const { createConvexHttpClient } = createConvexAuthHandlers();
	const client = await createConvexHttpClient(event);

	const recipes = await client.query(api.recipe.recipeByUser, {});

	return {
		recipes
	};
};
