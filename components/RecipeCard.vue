<script setup lang="ts">
import type { Recipe } from '~/types/recipe';

interface Props {
    recipe: Recipe
}

const props = defineProps<Props>();

const isDeleteModalOpen = ref(false);

const img = computed(() => {
    return props.recipe.img || "./img_placeholder.jpg";
});

function openDeleteModal(e) {
    e.stopPropagation();
    e.preventDefault();
    isDeleteModalOpen.value = true;
}

function handleCloseModal() {
    isDeleteModalOpen.value = false;
}

async function handleDelete() {
    await $fetch(`/api/recipe/${props.recipe.id}`, {
        method: "DELETE",
    });

    navigateTo("/recipes");
}
</script>

<template>
    <NuxtLink :to="`/recipes/${recipe.id}`">

        <div class="flex items-end w-full h-72 bg-center bg-cover rounded-lg hover:-translate-y-1"
            :style="`background-image: url('${img}')`">
            <div class="glass flex items-center justify-between px-4 rounded-b-lg">
                <h4 class="w-[90%] font-bold text-lg truncate">{{ recipe.title }}</h4>
                <UIcon @click.stop="openDeleteModal" name="i-material-symbols:delete-outline-rounded"
                    class="w-5 h-5 text-red-500 hover:text-red-600 active:text-red-700" />
            </div>
        </div>

    </NuxtLink>

    <UModal v-model="isDeleteModalOpen">
        <UCard>
            <template #header>
                <h4 class="font-bold">Delete recipe</h4>
            </template>

            <p>Are you sure you want to delete {{ recipe.title }} ?</p>

            <template #footer>
                <div class="flex justify-end gap-2 w-full">
                    <UButton @click="handleCloseModal" variant="link" color="white">Cancel</UButton>
                    <UButton @click="handleDelete" color="red">Delete</UButton>
                </div>
            </template>
        </UCard>
    </UModal>

</template>

<style lang="scss" scoped>
.glass {
    @apply bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 backdrop-saturate-100 backdrop-contrast-100 h-12 w-full;
}
</style>
