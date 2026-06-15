# Node.js + Express + TypeScript + Prisma + MySQL Setup

## 1. Initialize Project

```bash
npm init -y
```

---

## 2. Install Dependencies

### Production Dependencies

```bash
npm install express cors dotenv
npm install @prisma/client@6
```

### Development Dependencies

```bash
npm install -D typescript ts-node-dev @types/node @types/express @types/cors prisma@6
```

---

## 3. Initialize TypeScript

```bash
npx tsc --init
```

Replace the generated `tsconfig.json` with:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "moduleResolution": "node",
    "ignoreDeprecations": "6.0",
    "rootDir": ".",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["server.ts", "src/**/*"]
}
```

---

## 4. Project Structure

```text
project/
│
├── server.ts
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   └── routes/
│
├── prisma/
│   └── schema.prisma
│
├── .env
├── package.json
└── tsconfig.json
```

---

## 5. Initialize Prisma

```bash
npx prisma init
```

This creates:

```text
prisma/
└── schema.prisma

.env
```

---

## 6. Configure Database Connection

### `.env`

```env
DATABASE_URL="mysql://root:password@localhost:3306/user_db"
```

Update the values according to your MySQL database configuration.

---

## 7. Configure Prisma Schema

### `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        BigInt   @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 8. Generate Prisma Client

```bash
npx prisma generate
```

---

## 9. Create Initial Migration

```bash
npx prisma migrate dev --name init
```

This command will:

* Create migration files
* Create database tables
* Generate Prisma Client

---

## 10. Configure Prisma Client

### `src/config/prisma.ts`

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

---

## 11. Configure Package Scripts

### `package.json`

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

---

## 12. Run Development Server

```bash
npm run dev
```

---

## 13. Build for Production

```bash
npm run build
```

Generated output:

```text
dist/
├── server.js
└── src/
```

---

## 14. Start Production Server

```bash
npm start
```

---

## Common Prisma Commands

### Generate Prisma Client

```bash
npx prisma generate
```

### Create Migration

```bash
npx prisma migrate dev --name migration_name
```

### Deploy Existing Migrations

```bash
npx prisma migrate deploy
```

### Open Prisma Studio

```bash
npx prisma studio
```

---

## Recommended MVC Structure

```text
project/
│
├── server.ts
│
├── src/
│   ├── config/
│   │   └── prisma.ts
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   └── middleware/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── .env
├── package.json
├── tsconfig.json
└── node_modules/
```

This setup uses:

* Node.js
* Express.js
* TypeScript
* Prisma ORM v6
* MySQL
* MVC Architecture
