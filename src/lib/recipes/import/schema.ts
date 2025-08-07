import z from 'zod';

export const importRecipeSchema = z.object({
	url: z.string().url()
});
