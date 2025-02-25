import { Grocery } from "~/server/models/Grocery.model";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({
            statusCode: 401,
            message: "unauthorized",
        });
    }

    const id = getRouterParam(event, "id");

    let grocery;

    try {
        grocery = await Grocery.findById(id);
    } catch (err) {
        throw createError({
            statusCode: 500,
            message: "error retrieving grocery list",
        });
    }


    if (!grocery) {
        throw createError({
            statusCode: 404,
            message: "grocery list not found",
        });
    }

    if (grocery.user_id !== user.id) {
        throw createError({
            statusCode: 403,
            message: "forbidden",
        });
    }

    return {
        id: grocery._id,
        list: grocery.list,
    }
});
