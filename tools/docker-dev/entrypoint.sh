#!/usr/bin/env sh

echo "Launching api..."
nodemon -w /api/api.js /api/api.js &

echo "Launching nginx..."
nginx -g "daemon off;"
