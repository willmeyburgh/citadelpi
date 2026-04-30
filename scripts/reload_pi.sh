#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

cd /home/will/citadelpi/pi

PID=$(lsof -t -i:8080 2>/dev/null)
if [ -n "$PID" ]; then
    kill -9 $PID 2>/dev/null
    sleep 1
fi

pnpm build

export PORT=8080
node .output/server/index.mjs &

sleep 3
export DISPLAY=:0
xdotool search --sync --onlyvisible --name firefox key F5 2>/dev/null || true