import { createConvexAuthHandlers } from '@mmailaender/convex-auth-svelte/sveltekit/server';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { api } from '../convex/_generated/api';

const { getAuthState } = createConvexAuthHandlers();

export const load: LayoutServerLoad = async (event) => {
	const authState = await getAuthState(event);
	if (event.url.pathname !== '/auth' && !authState._state.token) {
		throw redirect(302, '/auth');
	}
	const { createConvexHttpClient } = createConvexAuthHandlers();
	const client = await createConvexHttpClient(event);

	const user = await client.query(api.user.getViewer, {});

	return { authState: await getAuthState(event), user: user! };
};
