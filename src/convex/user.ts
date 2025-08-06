import { Infer, v } from 'convex/values';
import { action, internalMutation, mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import { Id } from './_generated/dataModel';
import { internal } from './_generated/api';

export const userSchema = v.object({
	name: v.optional(v.string()),
	image: v.optional(v.string()),
	email: v.optional(v.string()),
	emailVerificationTime: v.optional(v.number()),
	phone: v.optional(v.string()),
	phoneVerificationTime: v.optional(v.number()),
	isAnonymous: v.optional(v.boolean()),
	internalImageId: v.optional(v.id('_storage'))
});

export type User = Infer<typeof userSchema> & { _id: string };

export const getViewer = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);

		if (!userId) {
			return null;
		}

		return ctx.db.get(userId);
	}
});

export const updateInternalImageId = internalMutation({
	args: {
		userId: v.id('users'),
		imageId: v.id('_storage')
	},
	async handler(ctx, args) {
		await ctx.db.patch(args.userId, { internalImageId: args.imageId });
	}
});

export const storeUserGoogleProfilePicture = action({
	args: {
		userId: v.id('users'),
		imageUrl: v.string()
	},
	async handler(ctx, args) {
		const response = await fetch(args.imageUrl);
		const image = await response.blob();

		const storageId: Id<'_storage'> = await ctx.storage.store(image);

		await ctx.runMutation(internal.user.updateInternalImageId, {
			userId: args.userId,
			imageId: storageId
		});
	}
});

export const getUserImageUrl = query({
	args: {},
	async handler(ctx, _) {
		const userId = await getAuthUserId(ctx);

		if (!userId) {
			return null;
		}

		const user = await ctx.db.get(userId);

		if (!user || !user.internalImageId) {
			return null;
		}

		const imageUrl = await ctx.storage.getUrl(user.internalImageId);

		return imageUrl;
	}
});
