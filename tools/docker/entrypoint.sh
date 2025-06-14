#!/usr/bin/env sh

echo "Launching api..."
node /api/api.js &

echo "Launching nginx..."
nginx -g "daemon off;"
