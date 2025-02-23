import { zh } from "h3-zod";
import { z } from "zod";
import { createGrocery } from "~/server/recipe_fetcher/fetch";
import { Grocery } from "~/server/models/Grocery.model";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({
            statusCode: 401,
            message: "unauthorized",
        });
    }

    const { ingredients } = await zh.useValidatedBody(event, z.object({
        ingredients: z.array(z.string()).min(1),
    }));

    const { list } = await createGrocery(ingredients);

    let id: string;

    try {
        const grocery = new Grocery({
            user_id: user.id,
            list: list,
        });

        await grocery.save();

        id = grocery._id;
    } catch (err) {
        console.log(err)
        throw createError({
            statusCode: 500,
            message: "failed to create grocery"
        })
    }

    setResponseStatus(event, 201);

    return {
        id: id,
        list: list,
        user_id: user.id,
    };
});
