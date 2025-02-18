<script setup lang="ts">
const emit = defineEmits(["close"]);

const recipeUrl = ref("");

const recipeData = ref<{
    ingredients: string[];
    instructions: string[];
} | null>(null)

const loading = ref(false);

const isManual = ref(false);

async function handleFetchRecipe() {
    const url = recipeUrl.value;
    recipeUrl.value = "";
    loading.value = true;
    const recipe = await $fetch("/api/recipe", {
        method: "POST",
        body: {
            recipeUrl: url,
        },
    });
    loading.value = false;

    recipeData.value = recipe;
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
            <UButton @click="handleFetchRecipe" :disabled="loading">Ajouter recette</UButton>
        </div>

        <RecipeForm v-else @created="emit('close')" />
    </UCard>
</template>
