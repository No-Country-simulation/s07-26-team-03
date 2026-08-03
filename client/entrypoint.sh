#!/bin/sh

echo "🔧 Injecting environment variables..."

envsubst < /usr/share/nginx/html/env.js > /usr/share/nginx/html/env.js

echo "===== env.js ====="
cat /usr/share/nginx/html/env.js
echo "=================="

exec nginx -g 'daemon off;'