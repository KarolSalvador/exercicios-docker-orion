# 1. Use uma imagem base leve (node:alpine)
# O Alpine é uma distribuição Linux mínima, resultando em imagens muito menores.
FROM node:18-alpine

# 2. Configure o WORKDIR
# Define o diretório de trabalho padrão dentro do container
WORKDIR /usr/src/app

# 3.Copie o arquivo de dependências (package.json e package-lock.json, se existir)
# Será feito isso para aproveitar o cache de camadas do Docker.
# Se somente o código (index.js) mudar, a camada de dependências não precisa ser reconstruída.
COPY package*.json ./

# 4. Instale dependências
# O 'npm ci' é mais rápido e seguro para builds em ambientes de container do que o 'npm install'.
RUN npm ci --only=production

# 5. Copie o restante do código da aplicação 
# Copia o código real da aplicação (index.js)
COPY . .

# Expõe a porta que a aplicação Node.js está escutando (3000)
# Não abre a porta no hot, é apenas documentação
EXPOSE 3000

# 6. Define o comando de execução (CMD)
# O comando que será executado quando o container iniciar.
CMD [ "npm", "start"]