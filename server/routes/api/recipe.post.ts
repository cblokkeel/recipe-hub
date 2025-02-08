import { zh } from "h3-zod";
import { z } from "zod";
import { fetchRecipe } from "~/server/recipe_fetcher/fetch";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: "unauthorized",
        });
    }

    const { recipeUrl } = await zh.useValidatedBody(event, z.object({
        recipeUrl: z.string().url(),
    }));

    const recipe = await fetchRecipe(recipeUrl);

    return recipe;
});
