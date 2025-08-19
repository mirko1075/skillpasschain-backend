
# SkillPassChain Backend API

SkillPassChain Backend is the server-side application for SkillPassChain—a platform to manage, verify, and share skill credentials using blockchain technology. It provides RESTful APIs for authentication, user management, credential issuance, and verification. 
Assessments are AI created, verified (FASE I).
Once a certification is completed a certification NFT will be created (Fase II)

## Table of Contents

- [SkillPassChain Backend API](#skillpasschain-backend-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
  - [Configuration](#configuration)
  - [API Endpoints](#api-endpoints)
    - [Auth](#auth)
    - [Users](#users)
    - [Institutions](#institutions)
    - [Assessments](#assessments)
    - [Certifications](#certifications)
    - [Topics](#topics)
    - [Health Check](#health-check)
  - [Authentication](#authentication)
  - [Testing](#testing)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- User authentication & authorization (JWT)
- Credential management (issue, update, revoke)
- Blockchain integration for credential verification
- RESTful APIs for frontend/third-party integration
- Admin dashboard (optional)

## Tech Stack

- **Backend:** Node.js / Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT
- **File Uploads:** Multer
- **API Docs:** Swagger/OpenAPI
- **Testing:** Postman, Jest

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment variables:**
   Copy `.env.example` to `.env` and fill in required values.
   ```bash
   cp .env.example .env
   ```
3. **Start the server:**
   ```bash
   npm run dev
   ```
4. **Access API docs:**  
   Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) (if enabled).

## Configuration

- All configuration is via `.env` file.
- Typical variables: `PORT`, `DATABASE_URL`, `JWT_SECRET`, etc.

## API Endpoints

### Auth

- **POST** `/api/v1/auth/register` — Register user  
  `{ "name": "John Doe", "email": "john@example.com", "password": "Password123!" }`
- **POST** `/api/v1/auth/login` — Login  
  `{ "email": "john@example.com", "password": "Password123!" }`
- **POST** `/api/v1/auth/refresh` — Refresh token  
  `{ "refreshToken": "<refresh_token>" }`
- **POST** `/api/v1/auth/logout` — Logout (requires Authorization header)

### Users

- **POST** `/api/v1/users` — Create user
- **GET** `/api/v1/users` — Get all users
- **GET** `/api/v1/users/:id` — Get user by ID
- **PUT** `/api/v1/users/:id` — Update user
- **DELETE** `/api/v1/users/:id` — Delete user
- **POST** `/api/v1/users/:id/avatar` — Upload user avatar (multipart/form-data, field: `avatar`)
- **POST** `/api/v1/admin/create-admin` — Create admin (requires admin role)

### Institutions

- **POST** `/api/v1/institutions` — Create institution
- **GET** `/api/v1/institutions` — Get all institutions
- **GET** `/api/v1/institutions/:id` — Get institution by ID
- **PUT** `/api/v1/institutions/:id` — Update institution
- **DELETE** `/api/v1/institutions/:id` — Delete institution

### Assessments

- **POST** `/api/v1/assessments` — Create assessment
- **GET** `/api/v1/assessments` — Get all assessments
- **GET** `/api/v1/assessments/:id` — Get assessment by ID
- **PUT** `/api/v1/assessments/:id` — Update assessment
- **DELETE** `/api/v1/assessments/:id` — Delete assessment
- **PUT** `/api/v1/assessments/:id/complete` — Complete assessment
- **GET** `/api/v1/assessments/user/:userId` — Get user assessments

### Certifications

- **POST** `/api/v1/certifications` — Create certification
- **GET** `/api/v1/certifications` — Get all certifications
- **GET** `/api/v1/certifications/:id` — Get certification by ID
- **PUT** `/api/v1/certifications/:id` — Update certification
- **DELETE** `/api/v1/certifications/:id` — Delete certification
- **GET** `/api/v1/certifications/user/:userId` — Get user certifications

### Topics

- **POST** `/api/v1/topics` — Create topic
- **GET** `/api/v1/topics` — Get all topics
- **GET** `/api/v1/topics/:id` — Get topic by ID
- **PUT** `/api/v1/topics/:id` — Update topic
- **DELETE** `/api/v1/topics/:id` — Delete topic
- **PATCH** `/api/v1/topics/:id/active` — Activate/deactivate topic
- **POST** `/api/v1/topics/:id/upload` — Upload document for topic (multipart/form-data or `{ documentUrl: "url" }`)

### Health Check

- **GET** `/api/health` — Health check endpoint

## Authentication

Some endpoints require JWT authentication.  
Pass the token in the `Authorization` header:

```
Authorization: Bearer <accessToken>
```

## Testing

Use the provided Postman collection (`SkillPassChain-API.postman_collection.json`) to test all endpoints.

## Project Structure

```
src/
  app.ts
  server.ts
  api/v1/
    controllers/
    helpers/
    interfaces/
    models/
    routes/
    services/
    errors/
    middlewares/
    mock/
    modules/
    repositories/
    utils/
```

## Contributing

Contributions are welcome!  
1. Fork the repository  
2. Create a new branch  
3. Commit your changes  
4. Push to your branch  
5. Open a Pull Request

## License

MIT

---

_SkillPassChain Backend — Secure, verifiable skills for the future of work._
