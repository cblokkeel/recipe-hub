import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { ConvexHttpClient } from 'convex/browser';
import { createConvexAuthHandlers } from '@mmailaender/convex-auth-svelte/sveltekit/server';
import { importRecipeSchema } from '$lib/recipes/import/schema';
import { api } from '../../../convex/_generated/api';
import { redirect } from '@sveltejs/kit';

let client: ConvexHttpClient;

export const load: PageServerLoad = async (event) => {
	const form = await superValidate(null, zod(importRecipeSchema));

	const { createConvexHttpClient } = createConvexAuthHandlers();
	client = await createConvexHttpClient(event);

	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(importRecipeSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		await client.action(api.recipe.importRecipeByURL, {
			url: form.data.url
		});

		return redirect(303, '/');
	}
} satisfies Actions;
