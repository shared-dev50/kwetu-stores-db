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
ALTER TABLE products ADD COLUMN stock INTEGER DEFAULT 0;

// The Main Sales Table
CREATE TABLE sales (
id SERIAL PRIMARY KEY,
total_amount DECIMAL(10, 2) NOT NULL,
payment_method VARCHAR(20) NOT NULL, -- 'cash' or 'card'
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// The Sale Items Table - Details
CREATE TABLE sale_items (
id SERIAL PRIMARY KEY,
sale_id INTEGER REFERENCES sales(id) ON DELETE CASCADE,
product_id INTEGER REFERENCES products(id),
quantity INTEGER NOT NULL,
unit_price DECIMAL(10, 2) NOT NULL
);

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
JWT_SECRET='62a21721d62ad491dab705d845e46b161ba21547f0051d8339b1632be9e686983b16dc98132e87575f71e001e9f7a4475dd6700acf91b7f969141b268216480d'
STRIPE_SECRET_KEY='your-key'
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here

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

## Test Card

Card Number: 4242 4242 4242 4242
Expiry Date: Any date in the future
CVC: Any
Name on Card: Any
