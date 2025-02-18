export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await useRequestFetch()("/api/user");
    if (!user && to.name !== "login") {
        return navigateTo("/login");
    } else if (user && to.name === "login") {
        return navigateTo("/recipes");
    } 

    if (to.path === "/") {
        return navigateTo("/recipes");
    }
})
