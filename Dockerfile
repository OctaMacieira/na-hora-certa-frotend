# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev=false

COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Configuração para SPA: redireciona todas as rotas para index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 do container. Ao executar, use -p <porta-local>:80
# Exemplo: docker run -p 3000:80 na-hora-certa-frontend
# Acesse em: http://localhost:3000
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
