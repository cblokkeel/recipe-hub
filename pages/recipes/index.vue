<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRecipesStore } from '~/stores/recipes';
import type { Recipe } from '~/types/recipe';

const recipesStore = useRecipesStore();

const { data } = await useFetch<Recipe[]>("/api/recipe", {
    method: "GET",
});

if (data.value) {
    recipesStore.setRecipes(data.value);
}

const { recipes } = storeToRefs(recipesStore);


const isAddModalOpen = ref(false);

function handleCloseModal() {
    isAddModalOpen.value = false;
}
</script>

<template>
    <UPage>
        <UContainer class="mt-8">
            <div class="flex items-center justify-between mb-4">
                <h1 class="font-bold text-2xl">Recipes</h1>
                <UButton @click="isAddModalOpen = true">
                    Ajouter une recette
                </UButton>
            </div>

            <UPageGrid>
                <RecipeCard v-for="(r) in recipes" :key="r.id" :recipe="r" />
            </UPageGrid>
        </UContainer>

        <UModal v-model="isAddModalOpen">
            <AddRecipe @close="handleCloseModal" />
        </UModal>
    </UPage>
</template>
