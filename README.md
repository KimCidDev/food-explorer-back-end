# FaveMeal Backend 🥩🔪

[Dá uma olhada!](https://favemeal.netlify.app/)

This repository contains the backend codebase for the FaveMeal web app. The backend is responsible for handling various requests from users and administrators, managing user authentication, and providing necessary data to the frontend.

Este repositório contém o código do backend para o web app FaveMeal. O backend é responsável por lidar com requisições de usuários e administradores, gerenciar autenticação de usuário e fornecer os dados necessários para o frontend.

## Caixa de Ferramentas 🧰

- Node.js;
- Express.js;
- cors;
- jsonwebtoken;
- Knex.js;
- multer;
- pm2;
- SQLite;

## Instalação 🤔

1. Clone o repositório:

```bash
git clone https://github.com/KimCidDev/food-explorer-back-end.git
```

2. Navegue até a pasta:

```bash
cd food-explorer-back-end
```

3.Instale as dependências:

```bash
npm install
```

## Uso

1. Inicie o servidor:

```bash
npm start
```

## Endpoints 🛣️

- POST /api/users/register: Registrar um novo usuário.
- POST /api/users/login: Fazer login.
- GET /api/dishes: Acessar todos os pratos.
- GET /api/dishes/:dishId: Acessar detalhes de cada prato.
- GET /api/dishes/[nome do prato || tag]: Pesquisar por nome ou pela tag (opcional).
- POST /api/dishes: Criar novos pratos (só admin).
- PUT /api/dishes/:dishId: Atualizar um prato (só admin).
- DELETE /api/dishes/:dishId: Remover um prato (só admin).

## Contribuidor

KimCidDev

///////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////

# FaveMeal Backend 🥩🔪

[Check it out!](https://favemeal.netlify.app/)

This repository contains the backend codebase for the FaveMeal web app. The backend is responsible for handling various requests from users and administrators, managing user authentication, and providing necessary data to the frontend.

## Toolbox 🧰

- Node.js;
- Express.js;
- cors;
- jsonwebtoken;
- Knex.js;
- multer;
- pm2;
- SQLite;

## Installation 🤔

1. Clone the repository:

```bash
git clone https://github.com/KimCidDev/food-explorer-back-end.git
```

2. Navigate into the project directory:

```bash
cd food-explorer-back-end
```

3.Install dependencies:

```bash
npm install
```

## Usage

1. Start the server:

```bash
npm start
```

## API Endpoints 🛣️

- POST /api/users/register: Register a new user.
- POST /api/users/login: Log in as a user.
- GET /api/dishes: Get all dishes.
- GET /api/dishes/:dishId: Get details of a specific dish.
- GET /api/dishes/search?name=query&tag=query: Search for dishes by name and/or tag (optional).
- POST /api/dishes: Create a new dish (admin only).
- PUT /api/dishes/:dishId: Update an existing dish (admin only).
- DELETE /api/dishes/:dishId: Remove a dish (admin only).

## Contributors

KimCidDev
