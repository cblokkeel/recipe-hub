import { convexAuth } from '@convex-dev/auth/server';
import Google from '@auth/core/providers/google';
import { User } from './user';
import { api } from './_generated/api';

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [Google],
	jwt: {
		durationMs: 60 * 60 * 24 * 30 * 1000
	},
	callbacks: {
		async afterUserCreatedOrUpdated(ctx, args) {
			const user: User = await ctx.db.get(args.userId);

			if (!user) {
				console.error('User not found after creation or update:', args.userId);
				return;
			}

			if (!user.image) {
				console.warn('User image is not set:', user._id);
				return;
			}

			await ctx.scheduler.runAfter(0, api.user.storeUserGoogleProfilePicture, {
				userId: args.userId,
				imageUrl: user.image
			});
		}
	}
});
