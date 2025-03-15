<script setup lang="ts">
const { data: groceries, status } = await useFetch("/api/grocery", {
    lazy: true,
    server: false,
});
</script>

<template>
    <UContainer class="mt-8">

        <div class="flex items-center justify-between mb-4">
            <h1 class="font-semibold text-2xl">Grocery lists</h1>
            <UButton to="/grocery/new">Create grocery list</UButton>
        </div>

        <UPageGrid v-if="status === 'idle'">
            <USkeleton 
                v-for="i in 10" 
                :key="i"
                class="-12 h-12 cropped"
            />
        </UPageGrid>

        <UPageGrid v-else>
            <NuxtLink
                v-for="g in groceries" 
                :key="g.id"
                :to="`/grocery/${g.id}`"
                class="hover:-translate-y-1"
            >
            <div 
                class="flex items-center justify-center receipt cropped text-black font-mono pt-2 pb-4" 
            >
                {{ new Date().toLocaleString() }}
            </div>
            </NuxtLink>
        </UPageGrid>

    </UContainer>
</template>
