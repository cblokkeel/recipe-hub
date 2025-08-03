import { createConvexAuthHandlers } from '@mmailaender/convex-auth-svelte/sveltekit/server';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

const { getAuthState } = createConvexAuthHandlers();

export const load: LayoutServerLoad = async (event) => {
	const authState = await getAuthState(event);
	if (event.url.pathname !== '/auth' && !authState._state.token) {
		throw redirect(302, '/auth');
	}
	return { authState: await getAuthState(event) };
};
