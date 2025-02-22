import { defineStore } from "pinia";
import type { Recipe } from "~/types/recipe";

export const useRecipesStore = defineStore("recipes", () => {
    const recipes = ref<Recipe[]>([]);

    function setRecipes(r: Recipe[]) {
        recipes.value = [...r];
    }

    function addRecipes(r: Recipe[]) {
        recipes.value = [
            ...recipes.value,
            ...r,
        ];
    }

    function removeRecipe(id: string) {
        recipes.value = recipes.value.filter((r) => r.id !== id);
    }

    function updateRecipeImg(id: string, img: string) {
        recipes.value = recipes.value.map((r) => {
            if (r.id !== id) {
                return r;
            }

            return {
                ...r,
                img: img,
            }
        });
    }

    return {
        recipes,

        setRecipes,
        addRecipes,
        removeRecipe,
        updateRecipeImg,
    }
});

