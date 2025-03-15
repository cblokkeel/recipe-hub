export default defineEventHandler((event) => {
    const sessionId = getCookie(event, lucia.sessionCookieName) ?? null;
    if (!sessionId) {
        event.context.session = null;
        event.context.user = null;
        return;
    }
    lucia.invalidateSession(sessionId);
    deleteCookie(event, lucia.sessionCookieName);
    event.context.session = null;
    event.context.user = null;

    setResponseStatus(event, 204);
    return {}
});
