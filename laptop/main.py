from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse

app = FastAPI()

connected_clients: set[WebSocket] = set()
current_tab = 0
MAX_TAB = 1


async def broadcast(tab: int):
    message = f'{{"tab": {tab}}}'
    for client in list(connected_clients):
        try:
            await client.send_text(message)
        except Exception:
            connected_clients.discard(client)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.add(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            if data.get("type") == "ping":
                await websocket.send_json({"type": "pong"})
    except (WebSocketDisconnect, ValueError):
        connected_clients.discard(websocket)


@app.get("/tab/next")
async def tab_next():
    global current_tab
    current_tab = (current_tab + 1) % (MAX_TAB + 1)
    await broadcast(current_tab)
    return JSONResponse({"tab": current_tab})


@app.get("/tab/prev")
async def tab_prev():
    global current_tab
    current_tab = (current_tab - 1) % (MAX_TAB + 1)
    await broadcast(current_tab)
    return JSONResponse({"tab": current_tab})


@app.get("/status")
async def status():
    return JSONResponse({
        "running": True,
        "connected": len(connected_clients)
    })


@app.get("/tab/{tab_id}")
async def tab_set(tab_id: int):
    global current_tab
    if tab_id < 0 or tab_id > MAX_TAB:
        return JSONResponse(
            {"error": f"tab must be 0-{MAX_TAB}"}, status_code=400
        )
    current_tab = tab_id
    await broadcast(current_tab)
    return JSONResponse({"tab": current_tab})
