const routes = ['/trials', '/factorio']

export const useTabController = () => {
  const config = useRuntimeConfig()
  const laptopHost = config.public.laptopHost as string
  const wsUrl = `ws://${laptopHost}:4444/ws`

  const currentTab = ref(0)

  function connect() {
    if (!import.meta.client) return

    let ws: WebSocket
    let reconnectTimer: ReturnType<typeof setTimeout>

    function setup() {
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
        reconnectTimer = setTimeout(setup, 3000)
      }

      ws.onerror = () => {
        ws.close()
      }
    }

    setup()

    onUnmounted(() => {
      clearTimeout(reconnectTimer)
      ws?.close()
    })
  }

  return { currentTab, connect }
}
