# 🤖 Módulo de Automação com n8n

Este módulo contém a orquestração completa da stack de automação para os projetos de **Evolution API** (WhatsApp) e **Integrações de Dados** (Google Sheets, Gemini).

## 🧱 Stack de Serviços

A orquestração utiliza o `docker-compose.yml` para subir todos os serviços necessários:

| Serviço           | Imagem                      | Finalidade                                                                                 |
| :---------------- | :-------------------------- | :----------------------------------------------------------------------------------------- |
| **n8n**           | `orion-n8n-custom`          | Plataforma de automação e orquestração dos workflows.                                      |
| **Evolution API** | `evoapicloud/evolution-api` | Gerenciamento da API de WhatsApp.                                                          |
| **database**      | `pgvector/pgvector:pg14`    | Banco de dados (PostgreSQL com extensão pgvector) para persistência do n8n e do Evolution. |
| **redis**         | `redis:6-alpine`            | Cache e gerenciamento de filas para o Evolution e n8n.                                     |

**Customização:** O `Dockerfile` customizado instala a biblioteca `sharp` para permitir o processamento avançado de imagens (como a conversão para sticker WebP) nos fluxos.

## 📂 Estrutura e Workflows

| Arquivo/Pasta                                   | Descrição                                                                                                   |
| :---------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| **`docker-compose.yml`**                        | Define a stack de 4 serviços e a rede.                                                                      |
| **`Dockerfile`**                                | Customiza a imagem do n8n com o pacote `sharp`.                                                             |
| **`workflows/`**                                | Contém todos os workflows exportados (.json).                                                               |
| **`workflows/WhatsApp Completo.json`**          | Workflow principal de roteamento de mensagens do WhatsApp (texto, áudio, figurinha, imagem).                |
| **`workflows/Webhook - Audio.json`**            | Transcreve o conteúdo de áudios recebidos via Gemini.                                                       |
| **`workflows/Webhook - Image to Sticker.json`** | Recebe uma imagem, usa o `sharp` (via `Edit Image` ou `Code`) e a API Evolution para enviá-la como sticker. |
| **`workflows/CRUD - Sheets.json`**              | API REST completa (CRUD) para gerenciar dados em Google Sheets.                                             |

## ⚙️ Guia de Instalação e Execução

### 1. Variáveis de Ambiente

Crie o arquivo **`.env`** na raiz desta pasta (`n8n/`) e preencha as variáveis de ambiente necessárias para a stack:

#### Exemplo de variáveis (você deve preencher com seus valores)

```
DB_USER=orion DB_PASSWORD=sua_senha_db

REDIS_PASSWORD=sua_senha_redis

EVO_API_KEY=sua_chave_evolution

N8N_KEY=sua_chave_n8n

WEBHOOK_URL=http://<seu-host>:5678/webhook

N8N_HOST=localhost
```

### 2. Comandos

Execute a stack de serviços:

```bash
# Navega para a pasta
cd n8n

# Constrói a imagem customizada e sobe todos os serviços (Postgres, Redis, n8n, Evolution)
docker compose up -d --build
```

### 3. Acesso

O n8n estará acessível em http://localhost:5678.
