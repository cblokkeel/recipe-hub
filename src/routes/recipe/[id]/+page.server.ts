import { createConvexAuthHandlers } from '@mmailaender/convex-auth-svelte/sveltekit/server';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';

export const load: PageServerLoad = async (event) => {
	const recipeId = event.params.id;

	const { createConvexHttpClient } = createConvexAuthHandlers();
	const client = await createConvexHttpClient(event);

	try {
		const recipe = await client.query(api.recipe.getRecipeById, { id: recipeId as Id<'recipes'> });
		return {
			recipe
		};
	} catch (error) {
		console.error('Error fetching recipe:', error);
		throw redirect(302, '/');
	}
};
