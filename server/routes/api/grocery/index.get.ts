import { Grocery } from "~/server/models/Grocery.model";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({
            statusCode: 401,
            message: "unauthorized",
        });
    }

    let groceryLists;
    try {
        groceryLists = await Grocery.find({
            user_id: user.id
        }).exec();
    } catch (err) {
        throw createError({
            statusCode: 500,
            message: "failed to retrieve groceries",
        });
    }

    return groceryLists.map(({ _id, list }) => {
        return {
            id: _id,
            list: list,
        };
    });
});
