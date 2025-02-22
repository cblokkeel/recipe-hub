import { Recipe } from "~/server/models/Recipe.model";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({
            statusCode: 401,
            message: "unauthorized",
        });
    }

    const id = getRouterParam(event, "id");

    let recipe;
    try {
        recipe = await Recipe.findById(id).exec();
    } catch (err) {
        console.error(`error retrieving recipe ${id} from db: ${err}`);
        throw createError({
            statusCode: 500,
            message: "error retrieving recipe"
        });
    }

    if (!recipe) {
        throw createError({
            statusCode: 404,
            message: "no recipe"
        });
    }

    try {
        await recipe.deleteOne().exec();
        setResponseStatus(event, 204);
        return {
            deleted: id
        }
    } catch (err) {
        throw createError({
            statusCode: 500,
            message: "error deleting recipe",
        });
    }
});
