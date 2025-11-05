# --------------------------------------------------------
# STAGE 1: Build (Ambiente de Desenvolvimento)
# --------------------------------------------------------
# Usa uma imagem Node maior para ter as ferramentas de build disponíveis
FROM node:18 AS build

WORKDIR /usr/src/app

# Copia package.json e lock file para otimizar o cache
COPY package*.json ./

# Usa npm ci para garantir instalação exata e instala SOMENTE as dependências de produção
RUN npm ci --only=production

# Copia o código real da aplicação (index.js)
COPY . .

# --------------------------------------------------------
# STAGE 2: Production (Imagem Final Leve)
# --------------------------------------------------------
# (Requisito: imagem final leve)
FROM node:18-alpine AS production

WORKDIR /usr/src/app

# Copia as dependências de PRODUÇÃO (node_modules) do stage "build"
COPY --from=build /usr/src/app/node_modules ./node_modules
# Copia o código real (index.js, package.json)
COPY --from=build /usr/src/app/index.js .
COPY --from=build /usr/src/app/package*.json .

# Expõe a porta que a aplicação Node.js está escutando (3000)
EXPOSE 3000

# O comando que será executado quando o container iniciar.
CMD [ "npm", "start"]
