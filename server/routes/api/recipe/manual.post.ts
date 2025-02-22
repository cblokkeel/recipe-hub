import { zh } from "h3-zod";
import { z } from "zod";
import { Recipe } from "~/server/models/Recipe.model";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({
            statusCode: 401,
            message: "unauthorized",
        });
    }

    const { title, ingredients, instructions } = await zh.useValidatedBody(event, z.object({
        title: z.string().min(1),
        ingredients: z.array(z.string()).min(1),
        instructions: z.array(z.string()).min(1),
    }));

    let id: string;

    try {
        const recipe = new Recipe({
            title: title,
            ingredients: ingredients,
            instructions: instructions,
            user_id: user.id,
            minio_id: "TODO",
        });

        await recipe.save();

        id = recipe._id;
    } catch (err) {
        console.log(err)
        throw createError({
            statusCode: 500,
            message: "failed to create recipe"
        });
    }

    setResponseStatus(event, 201);

    return {
        id, 
        title,
        instructions,
        ingredients,
    } 
});
