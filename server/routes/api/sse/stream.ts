import type { H3Event } from 'h3'
import { addClient, removeClient } from '~/server/sse/clients'

export default defineEventHandler((event: H3Event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: "unauthorized",
        });
    }

    const res = event.node.res;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders();

    res.write(':\n\n');

    addClient(user.id, res);

    event.node.req.on("close", () => {
        removeClient(user.id);
    });
});
