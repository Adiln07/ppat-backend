import express from "express";
import dotenv from "dotenv";
import cityRoutes from "./routes/city.route.js";
import notariesRoutes from "./routes/notaries.route.js";
import articleRoutes from "./routes/article.route.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Express + TypeScript !");
});

app.use("/cities", cityRoutes);
app.use("/notaries", notariesRoutes);
app.use("/article", articleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
