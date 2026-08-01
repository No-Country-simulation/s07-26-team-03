# Stage 1: Install dependencies
FROM node:24.18-alpine3.24 AS deps

USER root

WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts

# Stage 2: Build application
FROM node:24.18-alpine3.24 AS builder

USER root

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY src ./scr

RUN npm run build

# Stage 3: Run application
FROM nginx:1.30.4-alpine3.24 AS runner

RUN apk add --no-cache gettext

COPY --from=builder /app/dist /usr/share/nginx/html
COPY env.template.js /usr/share/nginx/html/env.template.js
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY scripts/entrypoint-docker.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

CMD ["sh", "entrypoint.sh"]