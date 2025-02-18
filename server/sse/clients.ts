import type { ServerResponse } from "http";

const clients: Map<string, ServerResponse> = new Map();

export function addClient(uid: string, client: ServerResponse) {
    clients.set(uid, client);
}

export function removeClient(uid: string) {
    clients.delete(uid);
}

export function broadcast(data: any, uids: string[]) {
    const formatted = `data: ${JSON.stringify(data)}\n\n`;
    clients.forEach((client, uid) => {
        if (uids.includes(uid)) {
            client.write(formatted);
        }
    });
}

