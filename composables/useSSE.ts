import { ref, onMounted, onUnmounted } from "vue";

export interface UseSSEOptions {
    url?: string
    onMessage?: (message: any) => void
    onError?: (error: Event) => void
}

export function useSSE<T = any>(options: UseSSEOptions = {}) {
    const {
        url = "/api/sse/stream",
        onMessage,
        onError,
    } = options

    const data = ref<T[]>([]);
    const error = ref<Event | null>(null);
    const isConnected = ref(false);
    let eventSource: EventSource | null = null;

    const connect = () => {
        if (eventSource) {
            return;
        }

        eventSource = new EventSource(url);

        eventSource.onopen = () => {
            isConnected.value = true;
        }

        eventSource.onmessage = (event) => {
            try {
                const parsed = JSON.parse(event.data);
                data.value.push(parsed);

                if (onMessage) {
                    onMessage(parsed);
                }
            } catch (err) {
                console.error('Failed to parse SSE message:', err);
            }
        }

        eventSource.onerror = (e) => {
            error.value = e;
            isConnected.value = false;

            if (onError) {
                onError(e);
            }

            disconnect();
        }
    }

    const disconnect = () => {
        if (eventSource) {
            eventSource.close();
            eventSource = null;
            isConnected.value = false;
        }
    }

    onMounted(() => connect());
    onUnmounted(() => disconnect());

    return {
        data,
        error,
        isConnected,
        connect,
        disconnect,
    }
}

