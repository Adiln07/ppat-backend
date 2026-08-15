// import { PrismaClient } from "../generated/prisma/client.js";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default prisma;

// import { PrismaClient } from "../generated/prisma/client.js";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// const adapter = new PrismaMariaDb({
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT || 3306),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   connectionLimit: 3,
// });

// const prisma = new PrismaClient({ adapter });

// export default prisma;

// import "dotenv/config";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";
// import { PrismaClient } from "../generated/prisma/client.js";

// const databaseUrl = new URL(process.env.DATABASE_URL!);

// const adapter = new PrismaMariaDb({
//   host: databaseUrl.hostname,
//   port: Number(databaseUrl.port),
//   user: decodeURIComponent(databaseUrl.username),
//   password: decodeURIComponent(databaseUrl.password),
//   database: databaseUrl.pathname.replace("/", ""),
// });

// console.log("DB HOST:", databaseUrl.hostname);
// console.log("DB PORT:", databaseUrl.port);
// console.log("DB NAME:", databaseUrl.pathname.replace("/", ""));

// const prisma = new PrismaClient({
//   adapter,
// });

// export default prisma;

import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const rawDatabaseUrl = process.env.DATABASE_URL;

if (!rawDatabaseUrl) {
  throw new Error("DATABASE_URL belum tersedia di environment variables");
}

const databaseUrl = new URL(rawDatabaseUrl);

if (databaseUrl.protocol !== "mysql:") {
  throw new Error("DATABASE_URL harus diawali mysql://");
}

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  // user: decodeURIComponent(databaseUrl.username),
  // password: decodeURIComponent(databaseUrl.password),
  // database: decodeURIComponent(databaseUrl.pathname.slice(1)),
  user: "u3328314612_admin",
  password: "Ppsat2026_SecureDb",
  database: "u332831461_db_ppsat",
  connectionLimit: 3,
});

const prisma = new PrismaClient({ adapter });

export default prisma;
