# CitadelPi Laptop Agent — Continue Here

## Project Overview

This is a Raspberry Pi kiosk (480×320 SPI TFT display) running OpenBox + Firefox in fullscreen, serving a Nuxt 4 app at `http://localhost:8080`. The laptop (this machine) runs a FastAPI server that forwards keyboard-triggered tab changes to the Pi via WebSocket.

### IPs

| Machine | IP | Hostname |
|---------|----|----------|
| Pi | `192.168.2.156` | `citadelpi` |
| Laptop | `192.168.2.176` | — |

### Tab mapping

| Tab | Route | Page |
|-----|-------|------|
| 0 | `/trials` | Daily activity tracker |
| 1 | `/factorio` | Factorio production stats |

## Architecture

```
[Laptop]                               [Pi - Firefox kiosk]
┌─────────────────────────┐            ┌──────────────────────┐
│ Hyprland keybinds       │            │ Nuxt app @ :8080     │
│  SUPER+SHIFT+Right ──┐  │            │                      │
│  SUPER+SHIFT+Left  ──┤  │  curl to  │ useTabController.ts  │
│  SUPER+SHIFT+0     ──┤  │  :4444    │  → WebSocket client  │
│  SUPER+SHIFT+1     ──┘  │            │  → navigateTo(route) │
│                         │            │                      │
│ FastAPI server @ :4444  │            │ Browser auto-connects│
│  /tab/next              │  websocket │  to ws://192.168.    │
│  /tab/prev              │◄──────────►│  2.176:4444/ws       │
│  /tab/{0|1}             │   msg      │  on page load        │
│  /ws                    │  {"tab":N} │  reconnects every 3s │
└─────────────────────────┘            └──────────────────────┘
```

### Pi side — already done

The Nuxt app is built and deployed, the WebSocket client is wired up in `app/composables/useTabController.ts`. When it receives `{"tab": 0}` or `{"tab": 1}` it calls `navigateTo()` to switch pages. The Firefox kiosk already starts at `/trials`.

- Repo root: `/home/will/citadelpi/`
- Nuxt project: `/home/will/citadelpi/pi/`
  - Build output: `/home/will/citadelpi/pi/.output/`
  - Config: `pi/nuxt.config.ts` — has `runtimeConfig.public.laptopHost: '192.168.2.176'`
- Pi side reload script: `/home/will/citadelpi/scripts/reload_pi.sh`

The Pi's Nuxt app is built with Node v22 and pnpm. The production server runs via `node .output/server/index.mjs` on port 8080, managed by the OpenBox autostart (`~/.config/openbox/autostart`).

---

## What you need to do

### 1. Deploy the FastAPI server as a systemd service

Port: **4444** (already configured in the code)

Create a systemd user service at `~/.config/systemd/user/laptop-tabs.service`:

```ini
[Unit]
Description=CitadelPi Remote Tab Controller
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
WorkingDirectory=/home/will/citadelpi/laptop
ExecStart=%h/.local/bin/uv run uvicorn main:app --host 0.0.0.0 --port 4444
Restart=always
RestartSec=2

[Install]
WantedBy=default.target
```

Enable and start it:

```bash
systemctl --user daemon-reload
systemctl --user enable --now laptop-tabs.service
```

Note: `%h` expands to the home directory. If `uv` is elsewhere, use the full path. You may also need `loginctl enable-linger $(whoami)` so user services start at boot.

### 2. Create `scripts/deploy_laptop.sh`

This script should be placed at `/home/will/citadelpi/scripts/deploy_laptop.sh` and should:

- `git pull` (or just re-sync the laptop folder from the Pi's repo)
- Restart the systemd user service
- Be executable (`chmod +x`)

The file should look like this:

```bash
#!/bin/bash
set -e

REPO_DIR="/home/will/citadelpi"

cd "$REPO_DIR"
git pull

systemctl --user restart laptop-tabs.service

echo "Done. Laptop tab controller restarted."
```

### 3. Create Hyprland keybinds

Add to `~/.config/hypr/hyprland.conf`:

```conf
# CitadelPi tab switching
bind = SUPER SHIFT, right, exec, curl -s http://localhost:4444/tab/next > /dev/null
bind = SUPER SHIFT, left,  exec, curl -s http://localhost:4444/tab/prev > /dev/null
bind = SUPER SHIFT, 0,     exec, curl -s http://localhost:4444/tab/0 > /dev/null
bind = SUPER SHIFT, 1,     exec, curl -s http://localhost:4444/tab/1 > /dev/null
```

The `> /dev/null` silences the JSON response so it doesn't flash on screen.

### Key details

- The WebSocket connection is initiated **from the Pi browser to the laptop** at `ws://192.168.2.176:4444/ws`. The browser auto-reconnects every 3 seconds if the connection drops.
- There is **no authentication** on the API — it's a local-only network.
- The FastAPI server listens on `0.0.0.0:4444` so the Pi can reach it.
- The repo lives on the **Pi** (`/home/will/citadelpi/`). The laptop should clone/pull from there, or mount the directory. Alternatively, just copy the `laptop/` folder to the laptop and set up its own git tracking.
- Python >= 3.11 required. Dependencies managed via `uv` (see `pyproject.toml`).

### To test after deploying

1. On the Pi, restart the Nuxt app (`scripts/reload_pi.sh`) so the browser reconnects
2. On the laptop, confirm the service is running: `curl localhost:4444/tab/next`
3. The Pi's Firefox should switch to the next tab
4. Test the Hyprland keybinds
