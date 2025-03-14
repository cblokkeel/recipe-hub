import axios from "axios";
import { Grocery } from "~/types/grocery";
import { Recipe } from "~/types/recipe";

const url = process.env.RECIPE_FETCHER_URL;

// TODO add auth header
const client = axios.create({
    baseURL: url,
    timeout: 50_000,
});

export async function fetchRecipe(url: string): Promise<Omit<Recipe, "id" | "img">> {
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

export async function createGrocery(ingredients: string[]): Promise<Grocery> {
    const res = await client.post("/grocery", {
        ingredients,
    });

    return {
        list: res.data.list,
    }
}

