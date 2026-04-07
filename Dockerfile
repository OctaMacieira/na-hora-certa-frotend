# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Declara o argumento de build (pode ser sobrescrito com --build-arg)
ARG VITE_API_BASE_URL=http://localhost:5000/api

# Expõe o ARG como variável de ambiente para o Vite durante o build
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

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
