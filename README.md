````md
# Secure REST API

A REST API built with Node.js and Express.js demonstrating authentication, authorization, validation, password hashing, JWT authentication, role-based access control, and secure product CRUD operations.

## Features

- User registration
- Input validation
- Email normalization
- Password strength validation
- bcrypt password hashing
- User login
- JWT authentication
- Protected routes
- Role-based authorization
- Admin-only product management
- Product CRUD
- HTTP status codes
- Environment variables
- Authentication rate limiting
- In-memory data storage

## Tech Stack

- Node.js
- Express.js
- bcryptjs
- jsonwebtoken
- dotenv
- express-rate-limit

## Project Structure

```text
secure-rest-api/
├── src/
│   ├── server.js
│   ├── app.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── productController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── rateLimitMiddleware.js
│   └── data/
│       ├── users.js
│       └── products.js
├── .env
├── .gitignore
├── package.json
└── README.md
````

## Installation

Clone the project and install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=my_super_secret_key_change_this
```

Start the server:

```bash
node src/server.js
```

Server:

```text
http://localhost:5000
```

## Authentication Endpoints

### Register

```http
POST /api/auth/register
```

Example:

```json
{
    "name": "Isaac",
    "email": "isaac@example.com",
    "password": "Isaac@123",
    "role": "user"
}
```

### Login

```http
POST /api/auth/login
```

Example:

```json
{
    "email": "isaac@example.com",
    "password": "Isaac@123"
}
```

The response contains a JWT token.

## Authorization

Protected requests require:

```http
Authorization: Bearer <token>
```

### User

Users can:

```http
GET /api/products
```

### Admin

Admins can:

```http
GET /api/products
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

## Access Matrix

| Endpoint       | User   | Admin  |
| -------------- | ------ | ------ |
| Register       | Public | Public |
| Login          | Public | Public |
| GET Products   | Yes    | Yes    |
| POST Product   | No     | Yes    |
| PUT Product    | No     | Yes    |
| DELETE Product | No     | Yes    |

## HTTP Status Codes

* `200` — Successful request
* `201` — Resource created
* `400` — Invalid request data
* `401` — Authentication required/invalid
* `403` — Insufficient permissions
* `404` — Resource not found
* `409` — Resource conflict
* `500` — Server error

## Security

Passwords are hashed using bcrypt before storage.

Passwords are never returned in API responses.

JWT authentication uses a secret stored in an environment variable.

Authentication routes are protected with rate limiting.

## Data Storage

This project currently uses in-memory arrays instead of a database.

Data is lost whenever the server restarts.

A production version would replace the arrays with a persistent database.

## Testing

The API can be tested using Postman or Thunder Client.

Recommended testing flow:

1. Register a user.
2. Login.
3. Copy the JWT token.
4. Send the token in the Authorization header.
5. View products as a user.
6. Attempt an admin action as a user and confirm `403`.
7. Register/login as an admin.
8. Create, update, and delete products as the admin.
9. Test invalid and expired tokens.
10. Test validation and error responses.
11. Test rate limiting.

## Author

Isaac Moses

````

Commit:

```bash
git add .
git commit -m "docs: add project README"
````

### One thing before you move on

You already have `errorMiddleware.js` in the structure, but **don't worry about it right now** since the assignment's global error handler is bonus and we've already selected rate limiting as our one bonus.

Your core flow is now:

**Register → bcrypt → Login → JWT → Auth middleware → Role middleware → Product CRUD → Rate limiting**

Test it. Then we tear the whole thing apart and make you explain **every file and every request from memory.**
