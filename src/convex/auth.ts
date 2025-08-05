import { convexAuth } from '@convex-dev/auth/server';
import Google from '@auth/core/providers/google';

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [Google],
	jwt: {
		durationMs: 60 * 60 * 24 * 30 * 1000
	}
});
