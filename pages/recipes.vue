<script setup lang="ts">
const { data: recipes } = useFetch("/api/recipe", {
    method: "GET",
});

const isAddModalOpen = ref(false);
</script>

<template>
    <UPage>
        <UContainer>
            <UButton @click="isAddModalOpen = true">Ajouter une recette</UButton>
            {{ recipes }}
        </UContainer>

        <UModal v-model="isAddModalOpen">
            <AddRecipe />
        </UModal>
    </UPage>
</template>
