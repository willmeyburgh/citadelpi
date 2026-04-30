const routes = ['/trials', '/factorio']
const HEARTBEAT_INTERVAL = 15_000
const RECONNECT_DELAY = 3000

export const useTabController = () => {
  const config = useRuntimeConfig()
  const laptopHost = config.public.laptopHost as string
  const wsUrl = `ws://${laptopHost}:4444/ws`

  const currentTab = ref(0)

  function connect() {
    if (!import.meta.client) return

    let ws: WebSocket
    let reconnectTimer: ReturnType<typeof setTimeout>
    let heartbeatTimer: ReturnType<typeof setInterval>

    function cleanup() {
      clearInterval(heartbeatTimer)
      clearTimeout(reconnectTimer)
      if (ws) {
        ws.onopen = null
        ws.onclose = null
        ws.onerror = null
        ws.onmessage = null
        if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
          ws.close()
        }
      }
    }

    function setup() {
      cleanup()
      ws = new WebSocket(wsUrl)

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (typeof data.tab === 'number') {
            currentTab.value = data.tab
            navigateTo(routes[data.tab], { external: false })
          }
        } catch {
          /* ignore malformed messages */
        }
      }

      ws.onclose = () => {
        reconnectTimer = setTimeout(setup, RECONNECT_DELAY)
      }

      ws.onerror = () => {
        /* onclose will fire after onerror — no need to call ws.close() */
      }

      ws.onopen = () => {
        heartbeatTimer = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ping' }))
          } else {
            clearInterval(heartbeatTimer)
          }
        }, HEARTBEAT_INTERVAL)
      }
    }

    setup()

    onUnmounted(cleanup)
  }

  return { currentTab, connect }
}
