# Solução dos Desafios Docker: Containerização e Orquestração

Este repositório contém a solução completa para os exercícios e o Desafio Extra de Docker propostos no bootcamp Orion da New Rizon, utilizando Node.js como aplicação de backend.  
O projeto foi estruturado para demonstrar o domínio sobre Dockerfile, orquestração com Docker Compose, gerenciamento de ambientes (Dev/Prod) e as melhores práticas de persistência e segurança.

## 🧱 Estrutura do Repositório

O projeto está organizado em pastas modulares, conforme solicitado, para que cada exercício possa ser avaliado de forma isolada.  
exercicios-docker-orion/  
├── exercicio-1/ # Dockerfile + Compose (Hello World)  
├── exercicio-2/ # Compose: API + DB (Solução base)  
├── exercicio-3/ # Dev/Prod (Multi-Stage Build, Live Reload e Múltiplos Compose)  
├── exercicio-extra/ # Desafio: Stack Completa (API + DB + Interface de Administração)  
└── README.md # Documentação e Guia de Teste

---

## 🚀 Tecnologias e Ferramentas Utilizadas

<div align=center>

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker--Compose-D9E7FF?style=for-the-badge&logo=docker&logoColor=2496ED)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)  
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)

</div>

| Componente          | Tecnologia        | Observação                                          |
| :------------------ | :---------------- | :-------------------------------------------------- |
| **Containerização** | Docker            | Uso de imagens base `alpine` para leveza.           |
| **Orquestração**    | Docker compose    | Gerenciamento de rede, volume e dependências.       |
| **API**             | Node.js (Express) | Aplicação simples usada como base para os serviços. |
| **Banco de Dados**  | PostgreSQL        | Imagem oficial com persistência configurada.        |
| **Admin.**          | pgAdmin 4         | Interface web para gerenciamento do banco de dados. |

---

## ✅ Destaques e Boas Práticas Aplicadas

Todos os critérios de sucesso e avançados solicitados nos exercícios foram implementados:

1. **Dockerfile Otimizado (Exercício 3)**

- **Multi-Stage Build:** Separação das estapas de `build` (para instalação) e `production` (imagem final).
- **Imagens Leves:** Uso de `node:18-alpine`para a imagem final de produção, garantindo tamanho reduzido.
- **Cache Otimizado:** Ordem de `COPY package*.json` antes de `RUN npm ci` para acelerar builds.

2. **Isolamento de Ambientes (Exercício 3)**

- **`docker-compose.dev.yml`:** Configuração com **Volume Montado** (`./api:/usr/src/app`) e uso de **Nodemon com Polling** para garantir **Live Reload** funcional em ambientes Windows/WSL.
- **`docker-compose.prod.yml`:** Configuração isolada, usando `target: production` (a imagem otimizada) e **SEM volumes de código**, garantindo segurança e que apenas o código empacotado seja executado.

3. **Configuração Profissinal**

- **Persistência de Dados:** Udo de **Volumes Nomeados** (`postgres_data`) para garantir que os dados do banco de dados persistam após o `docker compose down`.
- **Segurança:** Uso de arquivo **`.env`** para variáveis sensíveis (senhas, usuários) e inclusão da regra `.env` no `.gitignore` para nunca versionar segredos.
- **Comunicação Segura:** Uso de **`depends_on`** e **`healthcheck`** (com `condition: service_healthy`) para garantir que a API e o pgAdmin só iniciemquando o PostgreSQL estiver 100% pronto.
- **Estrutura Git:** Utilização de **Commits Semânticos** para facilitar a revisão do histórico de desenvolvimento.

---

## 👨‍💻 Guia de Execução e Teste

Para executar e testar cada solução, navegue para a pasta correspondente no terminal.

### 1. Exercício 1: Hello Container

- **Pasta:** `exercicio-1/`
- **Teste:**

```bash
docker compose up -d --build
# Acessar http://localhost:3000
docker compose down
```

### 2. Exercício 2: API + DB

- **Pasta:** `exercicio-2/`
- **Teste (Stack Simples):**

```bash
docker compose up -d --build
# Acessar http://localhost:3000health (Deve retornar "db": "online")
docker compose down
```

### 3. Exercício 3: Dev/Prod

- **Pasta:** `exercicio-3/`
- **Teste Dev (Com Live Reload):**

```bash
docker compose -f docker-compose.dev.yml up -d --build
# Testar live reload: Alterar index.js e recarregar http://localhost:3000
docker compose -f docker-compose.dev.yml down
```

- **Teste Prod (Otimizado/Isolado):**

```bash
docker compose -f docker-compose.prod.yml up -d --build
# Acessar http://localhost/health
docker compose -f docler-compose.prod.yml down
```

### 4. Desafio Extra: Stack Completa (API + DB + Admin)

- **Pasta:** `exercicio-extra/`
- **Teste:**

```bash
docker compose up -d --build
# 1. API Health Check: http://localhost:3000/health
# 2. Interface Admin: http://localhost/8080
docker compose down
```

#### Credenciais do Desafio Extra (Login no pgAdmin)

| Configuração        | Valor                                           |
| :------------------ | :---------------------------------------------- |
| **Sistema**         | PostgreSQL                                      |
| **Servidor (Host)** | `db`                                            |
| **Usuário**         | `bootcamp` (Variável DB_USER do .env)           |
| **Senha**           | `BootCamp@2025!` (Variável DB_PASSWORD do .env) |
| **Database**        | `bootcamp_db` (Variável DB_NAME do .env)        |
