import { Recipe, RecipeDAO } from "~/server/models/Recipe.model";

async function findRecipes(id: string): Promise<RecipeDAO[]> {
    try {
        const recipes = await Recipe.find({ user_id: id }).exec();
        return recipes;
    } catch (_) {
        throw createError({
            statusCode: 500,
            statusMessage: "failed to retrieve recipes",
        });
    }
}

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: "unauthorized",
        });
    }

    const recipes = await findRecipes(user.id);

    return recipes.map((r) => {
        return {
            id: r._id,
            ingredients: r.ingredients,
            instructions: r.instructions,
            origin: r.origin,
        };
    });
});
