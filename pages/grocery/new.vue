<script setup lang="ts">
import type { Recipe } from '~/types/recipe';

const recipesStore = useRecipesStore();

const { data } = await useFetch<Recipe[]>("/api/recipe", {
    method: "GET",
});

if (data.value) {
    recipesStore.setRecipes(data.value);
}

const { recipes } = storeToRefs(recipesStore);
const selectedRecipes = ref<Map<string, string[]>>(new Map());
const loading = ref(false);

function handleToggleSelectRecipe(id: string, ingredients?: string[]) {
    if (selectedRecipes.value.has(id)) {
        selectedRecipes.value.delete(id);
        return;
    } 

    selectedRecipes.value.set(id, ingredients || []);
}

async function handleCreateGrocery() {
    const ingredients = Array.from(selectedRecipes.value.values()).flat();
    selectedRecipes.value.clear();

    loading.value = true;
    const g = await $fetch("/api/grocery", {
        method: "POST",
        body: {
            ingredients,
        },
    });
    loading.value = false;

    navigateTo(`/grocery/${g.id}`);
}
</script>

<template>
    <UPage>
        <UContainer class="mt-8">

            <div class="flex justify-between items-center">
                <div>
                    <h1 class="font-semibold text-2xl">Select recipes</h1>
                    <span class="text-gray-300"><span class="text-primary-400">{{ selectedRecipes.size }}</span> recipes selected.</span>
                </div>

                <UButton 
                    :loading
                    :disabled="selectedRecipes.size <= 0" 
                    @click="handleCreateGrocery"
                >Create grocery list</UButton>
            </div>

            <UPageGrid class="mt-8">
                <RecipeCard 
                    v-for="(r) in recipes" 
                    @toggle-select="handleToggleSelectRecipe(r.id, r.ingredients)"
                    :key="r.id" 
                    :to="`/recipes/${r.id}`" 
                    :selectable="true"
                    :recipe="r" 
                />
            </UPageGrid>

        </UContainer>
    </UPage>
</template>
