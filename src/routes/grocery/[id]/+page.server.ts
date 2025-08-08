import { createConvexAuthHandlers } from '@mmailaender/convex-auth-svelte/sveltekit/server';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';

export const load: PageServerLoad = async (event) => {
	const id = event.params.id;

	const { createConvexHttpClient } = createConvexAuthHandlers();
	const client = await createConvexHttpClient(event);

	try {
		const grocery = await client.query(api.grocery.getGroceryById, { id: id as Id<'groceries'> });
		return {
			grocery
		};
	} catch (error) {
		console.error('Error fetching grocery:', error);
		throw redirect(302, '/');
	}
};
