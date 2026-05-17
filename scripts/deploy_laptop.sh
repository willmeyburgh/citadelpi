#!/bin/bash
set -e

REPO_DIR="/home/will/workspace/citadelpi"

cd "$REPO_DIR"
git pull

systemctl --user restart laptop-tabs.service

echo "Done. Laptop tab controller restarted."
