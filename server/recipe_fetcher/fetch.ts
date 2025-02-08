import axios from "axios";

const url = process.env.RECIPE_FETCHER_URL;

// TODO add auth header
const client = axios.create({
    baseURL: url,
    timeout: 10_000,
});

export interface Recipe {
    ingredients: string[];
    instructions: string[];
}

export async function fetchRecipe(url: string): Promise<Recipe> {
    const res = await client.post("/recipe", {
        recipeUrl: url,
    });

    // TODO validate the success of the req

    return {
        ingredients: res.data.ingredients,
        instructions: res.data.instructions,
    }
}
