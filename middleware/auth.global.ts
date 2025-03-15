export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await useRequestFetch()("/api/user");
    if (!user && !["login", "index"].includes(to.name as string)) {
        return navigateTo("/login");
    } else if (user && to.name === "login") {
        return navigateTo("/recipes");
    } 
});
