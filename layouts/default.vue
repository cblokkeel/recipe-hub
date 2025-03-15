<script setup lang="ts">
const links = [
    {
        label: "Recipes",
        icon: "i-heroicons-book-open",
        to: "/recipes"
    }, 
    {
        label: "Grocery list",
        icon: "i-heroicons-building-storefront",
        to: "/grocery/new"
    },
    {
        label: "History",
        icon: "i-heroicons-building-storefront",
        to: "/grocery"
    }
]

async function handleLogout() {
    await $fetch("/api/logout");
    navigateTo("/login");
}
</script>

<template>
    <UHeader :links="links">
        <template #left>
            <h1 class="text-2xl font-bold">RecipeHub</h1>
        </template>

        <template #right>
            <UButton 
                @click="handleLogout"
                color="red"
            >
                Logout
            </UButton>
        </template>
    </UHeader>


    <UPage>
        <slot />
    </UPage>

    <UFooter />
</template>
