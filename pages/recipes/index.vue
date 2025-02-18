<script setup lang="ts">
const { data: recipes } = useFetch("/api/recipe", {
    method: "GET",
});

const isAddModalOpen = ref(false);
</script>

<template>
    <UPage>
        <UContainer class="mt-8">

            <UButton 
                class="mb-2"
                @click="isAddModalOpen = true"
            >
                Ajouter une recette
            </UButton>

            <UPageGrid>
                <RecipeCard v-for="(r) in recipes" :key="r.id" :recipe="r" />
            </UPageGrid>
        </UContainer>

        <UModal v-model="isAddModalOpen">
            <AddRecipe />
        </UModal>
    </UPage>
</template>
