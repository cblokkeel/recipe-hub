import { zh } from "h3-zod";
import { z } from "zod";
import { Recipe } from "~/server/models/Recipe.model";
import { fetchRecipe } from "~/server/recipe_fetcher/fetch";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({
            statusCode: 401,
            message: "unauthorized",
        });
    }

    const { recipeUrl } = await zh.useValidatedBody(event, z.object({
        recipeUrl: z.string().url(),
    }));

    const { ingredients, instructions, title, minioId } = await fetchRecipe(recipeUrl);

    try {
        const recipe = new Recipe({
            title: title,
            ingredients: ingredients,
            instructions: instructions,
            user_id: user.id,
            origin: recipeUrl,
            minio_id: minioId,
        });

        await recipe.save();
    } catch (err) {
        console.log(err)
        throw createError({
            statusCode: 500,
            message: "failed to create recipe"
        })
    }

    return {
        title,
        ingredients,
        instructions
    };
});
