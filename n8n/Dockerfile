# Usa a imagem oficial do n8n como base
FROM n8nio/n8n:latest

# Instala dependências necessárias para o sharp
USER root
RUN apk add --no-cache \
    build-base \
    vips-dev \
    libc6-compat \
    autoconf \
    automake \
    libtool \
    nasm \
    python3

# Instala o sharp globalmente
RUN npm install -g sharp

# Define variáveis para permitir o uso do sharp dentro do n8n
ENV NODE_FUNCTION_ALLOW_EXTERNAL=sharp
ENV NODE_PATH=/usr/local/lib/node_modules

# Retorna para o usuário padrão
USER node
