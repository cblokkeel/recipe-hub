<script setup lang="ts">
definePageMeta({
    layout: false,
});

async function googleLogin() {
    const {
        data,
    } = await useFetch("/login/google");
    navigateTo(data.value?.url, {
        external: true
    });
}
</script>

<template>
    <UPage class="flex items-center justify-center h-screen">
        <UContainer class="flex flex-col items-center justify-center w-full ">
            <h1 class="font-bold text-3xl mb-4">Log into RecipeHub</h1>

            <UButton 
                @click="googleLogin"
                icon="i-mdi-google"
                variant="outline"
                class="px-8"
            >
                Google
            </UButton>
        </UContainer>
    </UPage>
</template>
