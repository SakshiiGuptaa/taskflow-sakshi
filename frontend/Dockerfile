# Stage 1 — build React app
FROM node:20-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN rm -f package-lock.json && npm cache clean --force && npm install --legacy-peer-deps

COPY . .

ARG VITE_API_BASE_URL=http://localhost:8000/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# Stage 2 — serve with nginx
FROM nginx:alpine AS runtime

COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]