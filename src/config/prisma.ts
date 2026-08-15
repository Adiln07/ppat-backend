import { PrismaClient } from "../generated/prisma/client.js";
// import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
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
