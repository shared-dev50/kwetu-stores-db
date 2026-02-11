# Kwetu Stores – Backend

Backend API for the Kwetu Stores system.

## Tech Stack

- Node.js

- Express

- PostgreSQL

- TypeScript

## Prerequisites

Node.js v18+

PostgreSQL v14+

pgAdmin 4 (recommended)

## Database Setup (PostgreSQL)

1. Install PostgreSQL
   👉 https://www.postgresql.org/download/

Use default settings

Keep port 5432

Remember the postgres password

2. Install pgAdmin 4
   👉 https://www.pgadmin.org/download/

3. Open pgAdmin 4

Set a master password

Right-click Servers → Register → Server

Name: kwetustores-db

Host: localhost

Username: postgres

Password: your Postgres password

✔ Save password

4. Create the database

Right-click Databases → Create → Database

Name: kwetustores

5. Create Products Table

6. With the kwetustores database selected, open Query Tool and run:

CREATE TABLE products (
id SERIAL PRIMARY KEY,
barcode TEXT UNIQUE NOT NULL,
name TEXT NOT NULL,
price NUMERIC NOT NULL,
created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name TEXT NOT NULL,
pin_hash TEXT NOT NULL,
role TEXT NOT NULL CHECK (role IN ('cashier', 'manager')),
created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE users ADD CONSTRAINT unique_name UNIQUE (name);

## Backend Setup

git clone https://github.com/shared-dev50/kwetu-stores-db.git
cd kwetu-stores-db
npm install

## Environment Variables

Create a .env file in the project root:

PORT=5001
DB_USER="postgres"
DB_HOST="localhost"
DB_NAME="kwetustores"
DB_PORT=5432
DB_PASSWORD="your-password"

## Run the Server

npm run dev

Server will start on:

http://localhost:5001

## API Endpoints

- GET /api/products – Get all products

- POST /api/products – Create a product

- DELETE /api/products/:id – Delete a product

### Create Product

**POST** `/api/products`

Request body example:

```json
{
  "barcode": "35764",
  "name": "chapati",
  "price": 67
}
```
