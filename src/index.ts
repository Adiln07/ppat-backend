import express from "express";
import dotenv from "dotenv";
import cityRoutes from "./routes/city.route.js";
import notariesRoutes from "./routes/notaries.route.js";
import articleRoutes from "./routes/article.route.js";
import authRoutes from "./routes/auth.route.js";
import uploadRoutes from "./routes/upload.route.js";
import publicRoutes from "./routes/public.route.js";
import cors from "cors";
import path from "path";
import prisma from "./config/prisma.js";
dotenv.config();

const app = express();

app.use(cors({
  origin: "https://ppatpengdapareparedst.web.id",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

const PORT = Number(process.env.PORT) || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Express + TypeScript !");
});
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Backend berjalan",
  });
});

app.use("/admin", authRoutes);
app.use("/cities", cityRoutes);
app.use("/notaries", notariesRoutes);
app.use("/article", articleRoutes);
app.use("/upload", uploadRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/public", publicRoutes);

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  try {
    await prisma.$connect();
    console.log("DATABASE CONNECT: SUCCESS");
  } catch (err: any) {
    console.log(
      "DATABASE CONNECT FAILED:",
      err?.message,
      err?.code,
      err?.cause,
    );
  }
});
