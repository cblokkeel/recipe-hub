import axios from "axios";
import { Recipe } from "~/types/recipe";

const url = process.env.RECIPE_FETCHER_URL;

// TODO add auth header
const client = axios.create({
    baseURL: url,
    timeout: 50_000,
});

export async function fetchRecipe(url: string): Promise<Omit<Recipe, "id">> {
    const res = await client.post("/recipe", {
        recipeUrl: url,
    });

    // TODO validate the success of the req

    return {
        title: res.data.title,
        ingredients: res.data.ingredients,
        instructions: res.data.instructions,
        minioId: res.data.minioId,
    }
}
