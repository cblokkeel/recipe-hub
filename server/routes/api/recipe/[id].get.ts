import { Recipe } from "~/server/models/Recipe.model";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    let recipe;
    try {
        recipe = await Recipe.findById(id).exec();
    } catch(err) {
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

    return {
        id: recipe._id,
        title: recipe.title,
        origin: recipe.origin,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        img: recipe.img_url,
    };
})
