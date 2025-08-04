import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { useConvexClient } from 'convex-svelte';
import { api } from '../../../convex/_generated/api';
import { ConvexHttpClient } from 'convex/browser';
import { PUBLIC_CONVEX_URL } from '$env/static/public';
import { createConvexAuthHandlers } from '@mmailaender/convex-auth-svelte/sveltekit/server';

const schema = z.object({
	name: z.string(),
	ingredients: z.array(z.string()),
	instructions: z.array(z.string()),
	image: z.string().optional()
});

let client: ConvexHttpClient;

export const load: PageServerLoad = async (event) => {
	const form = await superValidate({ ingredients: [''], instructions: [''] }, zod(schema));

	const { createConvexHttpClient } = createConvexAuthHandlers();
	client = await createConvexHttpClient(event);

	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		await client.mutation(api.recipe.createRecipe, {
			recipe: {
				name: form.data.name,
				ingredients: form.data.ingredients,
				instructions: form.data.instructions
			}
		});

		return message(form, 'Form posted successfully!');
	}
} satisfies Actions;
