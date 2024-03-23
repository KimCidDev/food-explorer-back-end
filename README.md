# Fave Backend

This repository contains the backend codebase for the Food Explorer web application. The backend is responsible for handling various requests from users and administrators, managing user authentication, and providing necessary data to the frontend.

## Toolbox

- Node.js;
- Express.js;
- cors;
- jsonwebtoken;
- Knex.js;
- multer;
- pm2;
- SQLite;

## Installation

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

## API Endpoints

- POST /api/users/register: Register a new user.
- POST /api/users/login: Log in as a user.
- GET /api/dishes: Get all dishes.
- GET /api/dishes/:dishId: Get details of a specific dish.
- GET /api/dishes/search?name=query&tag=query: Search for dishes by name and/or tag (optional).
- POST /api/dishes: Create a new dish (admin only).
- PUT /api/dishes/:dishId: Update an existing dish (admin only).
- DELETE /api/dishes/:dishId: Remove a dish (admin only).

## Contributors

Your Name
