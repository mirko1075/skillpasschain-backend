### Avatar Upload

- **POST** `/api/v1/users/:id/avatar` — Upload user avatar (multipart/form-data)
  - Form field: `avatar` (file)
  - Response: `{ "avatarUrl": "..." }`

### Topics

- **POST** `/api/v1/topics` — Create topic
  - Body: `{ "name": "Math", "description": "Mathematics basics", "levels": 3, "isActive": true }`
- **GET** `/api/v1/topics` — Get all topics
- **GET** `/api/v1/topics/:id` — Get topic by ID
- **PUT** `/api/v1/topics/:id` — Update topic
  - Body: `{ "name": "Advanced Math" }`
- **DELETE** `/api/v1/topics/:id` — Delete topic
- **PATCH** `/api/v1/topics/:id/active` — Activate/deactivate topic
  - Body: `{ "isActive": false }`
- **POST** `/api/v1/topics/:id/upload` — Upload document for topic (multipart/form-data or `{ documentUrl: "url" }`)
# SkillPassChain Backend API

This is the backend API for SkillPassChain, a platform for managing users, institutions, assessments, and certifications.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up your `.env` file (see `.env.example` if available).
3. Start the server:
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication

- **POST** `/api/v1/auth/register` — Register a new user
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "Password123!" }`
- **POST** `/api/v1/auth/login` — Login
  - Body: `{ "email": "john@example.com", "password": "Password123!" }`
- **POST** `/api/v1/auth/refresh` — Refresh access token
  - Body: `{ "refreshToken": "<refresh_token>" }`
- **POST** `/api/v1/auth/logout` — Logout (requires Authorization header)

### Users
- **POST** `/api/v1/admin/create-admin` — Create a new admin user (requires authentication and admin role)
  - Body: `{ "firstName": "Alice", "lastName": "Admin", "email": "admin@example.com", "password": "adminpass", "role": "admin" }`
  - Requires: Bearer token (admin)
- **POST** `/api/v1/users` — Create user
- **GET** `/api/v1/users` — Get all users
- **GET** `/api/v1/users/:id` — Get user by ID

### Assessments

- **POST** `/api/v1/assessments` — Create assessment
  - Body: `{ "userId": ":userId", "skill": "JavaScript" }`
- **PUT** `/api/v1/assessments/:id/complete` — Complete assessment
  - Body: `{ "score": 85 }`
- **GET** `/api/v1/assessments/user/:userId` — Get user assessments

### Certifications

- **GET** `/api/v1/certifications/user/:userId` — Get user certifications

### Health Check

- **GET** `/api/health` — Health check endpoint

## Postman Collection

You can test the API using the provided Postman collection file: `SkillPassChain-API.postman_collection.json`.

**How to use:**
1. Open Postman.
2. Click `Import` and select the `SkillPassChain-API.postman_collection.json` file from this repository.
3. Use the requests to interact with the API.

## Authentication

Some endpoints require authentication via JWT. Pass the token in the `Authorization` header:

```
Authorization: Bearer <accessToken>
```

## License

MIT
# SkillPassChain Backend API

This is the backend API for SkillPassChain, a platform for managing users, institutions, assessments, and certifications.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up your `.env` file (see `.env.example` if available).
3. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth

- **POST** `/api/v1/auth/register` — Register a new user
  - Body: `{ "firstName": "John", "lastName": "Doe", "email": "john@example.com", "password": "password123" }`
- **POST** `/api/v1/auth/login` — Login
  - Body: `{ "email": "john@example.com", "password": "password123" }`
- **POST** `/api/v1/auth/refresh-token` — Refresh access token
  - Body: `{ "refreshToken": "<token>" }`
- **POST** `/api/v1/auth/logout` — Logout
  - Body: `{ "userId": "<userId>" }`

### Users

- **POST** `/api/v1/users` — Create user
  - Body: `{ "firstName": "John", "lastName": "Doe", "email": "john@example.com", "password": "password123" }`
- **GET** `/api/v1/users` — Get all users
- **GET** `/api/v1/users/:id` — Get user by ID
- **PUT** `/api/v1/users/:id` — Update user
  - Body: `{ "firstName": "Jane" }`
- **DELETE** `/api/v1/users/:id` — Delete user

### Institutions

- **POST** `/api/v1/institutions` — Create institution
  - Body: `{ "name": "Harvard", "email": "contact@harvard.edu", "address": "Cambridge, MA" }`
- **GET** `/api/v1/institutions` — Get all institutions
- **GET** `/api/v1/institutions/:id` — Get institution by ID
- **PUT** `/api/v1/institutions/:id` — Update institution
  - Body: `{ "name": "MIT" }`
- **DELETE** `/api/v1/institutions/:id` — Delete institution

### Assessments

- **POST** `/api/v1/assessments` — Create assessment
  - Body: `{ "title": "JavaScript Fundamentals", "score": 95, "takenBy": "John Doe", "createdBy": "<userId>" }`
- **GET** `/api/v1/assessments` — Get all assessments
- **GET** `/api/v1/assessments/:id` — Get assessment by ID
- **PUT** `/api/v1/assessments/:id` — Update assessment
  - Body: `{ "score": 98 }`
- **DELETE** `/api/v1/assessments/:id` — Delete assessment

### Certifications

- **POST** `/api/v1/certifications` — Create certification
  - Body: `{ "title": "Blockchain Developer", "issuedBy": "<institutionId>", "recipient": "<userId>", "issueDate": "2025-01-01" }`
- **GET** `/api/v1/certifications` — Get all certifications
- **GET** `/api/v1/certifications/:id` — Get certification by ID
- **PUT** `/api/v1/certifications/:id` — Update certification
  - Body: `{ "title": "Advanced Blockchain Developer" }`
- **DELETE** `/api/v1/certifications/:id` — Delete certification

## Authentication

Some endpoints require authentication via JWT. Pass the token in the `Authorization` header:

```
Authorization: Bearer <accessToken>
```

## Testing

You can use the provided Postman collection (`SkillPassChain-API.postman_collection.json`) to test the API endpoints.

## License

MIT
# SkillPassChain Backend

SkillPassChain Backend is the server-side application that powers SkillPassChain—a platform for managing, verifying, and sharing skill credentials using blockchain technology. This backend provides RESTful APIs for authentication, user management, credential issuance, and verification.

## Table of Contents

- [SkillPassChain Backend API](#skillpasschain-backend-api)
  - [Getting Started](#getting-started)
  - [API Documentation](#api-documentation)
    - [Authentication](#authentication)
    - [Users](#users)
    - [Assessments](#assessments)
    - [Certifications](#certifications)
    - [Health Check](#health-check)
  - [Postman Collection](#postman-collection)
  - [Authentication](#authentication-1)
  - [License](#license)
- [SkillPassChain Backend API](#skillpasschain-backend-api-1)
  - [Getting Started](#getting-started-1)
  - [API Endpoints](#api-endpoints)
    - [Auth](#auth)
    - [Users](#users-1)
    - [Institutions](#institutions)
    - [Assessments](#assessments-1)
    - [Certifications](#certifications-1)
  - [Authentication](#authentication-2)
  - [Testing](#testing)
  - [License](#license-1)
- [SkillPassChain Backend](#skillpasschain-backend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started-2)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Configuration](#configuration)
  - [API Documentation](#api-documentation-1)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license-2)

## Features

- **User Authentication & Authorization**: Secure login and registration
- **Credential Management**: Issue, update, and revoke skill credentials
- **Blockchain Integration**: Store and verify credentials on the blockchain
- **RESTful APIs**: Clean, documented endpoints for frontend or third-party integration
- **Admin Dashboard**: (Optional) For managing users and credentials

## Tech Stack

- **Backend**: Node.js / Express.js (or NestJS, Koa, etc. — update based on actual implementation)
- **Database**: MongoDB / PostgreSQL / MySQL (update as appropriate)
- **Blockchain**: Ethereum / Hyperledger / other (update as appropriate)
- **Authentication**: JWT / OAuth2 (update as appropriate)
- **Other**: Docker, Swagger/OpenAPI for API docs

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 16.x
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- Database (MongoDB/PostgreSQL/etc.)
- (Optional) Docker

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mirko1075/skillpasschain-backend.git
   cd skillpasschain-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in the required values:

   ```bash
   cp .env.example .env
   ```

4. **Run database migrations** (if applicable)

   ```bash
   npm run migrate
   ```

5. **Start the server**

   ```bash
   npm start
   # or for development
   npm run dev
   ```

6. **Access API documentation**

   Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) (if Swagger/OpenAPI is enabled).

## Configuration

- All configuration is handled via environment variables in the `.env` file.
- Typical variables:
  - `PORT`
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `BLOCKCHAIN_RPC_URL`
  - etc.

## API Documentation

- This backend exposes a set of RESTful APIs.
- Interactive API docs (Swagger/OpenAPI) are available at `/api-docs` when running locally.

## Project Structure

```
.
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── tests/
├── .env.example
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

---

_SkillPassChain Backend — Secure, verifiable skills for the future of work._
