<script setup lang="ts">
import type { Recipe } from '~/types/recipe';

const recipeStore = useRecipesStore();

const emit = defineEmits(["close"]);

const recipeUrl = ref("");

const loading = ref(false);

const isManual = ref(false);

async function handleAddRecipe() {
    const url = recipeUrl.value;
    recipeUrl.value = "";
    loading.value = true;
    const recipe = await $fetch<Recipe>("/api/recipe", {
        method: "POST",
        body: {
            recipeUrl: url,
        },
    });
    loading.value = false;

    recipeStore.addRecipes([recipe]);
}

function handleManualRecipeAdded(r: Recipe) {
    recipeStore.addRecipes([r]);
    emit("close");
}
</script>

<template>
    <UCard
        class="rounded"
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow'
          }
        }"
      >
        <template #header>
            <h3 class="font-semibold">Add recipe</h3>
        </template>

        <div class="flex justify-center w-full mb-4">
            <UPricingToggle 
                v-model="isManual"
                class="max-w-xs"
            >
                <template #left>
                    Génerer
                </template>

                <template #right>
                    Manuel
                </template>
            </UPricingToggle>
        </div>

        <div class="flex gap-2 w-full" v-if="!isManual">
            <UInput v-model="recipeUrl" class="w-full" placeholder="URL" />
            <UButton @click="handleAddRecipe" :disabled="loading">Ajouter recette</UButton>
        </div>

        <RecipeForm v-else @created="handleManualRecipeAdded" />
    </UCard>
</template>
