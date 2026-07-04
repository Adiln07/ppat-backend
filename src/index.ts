import express from "express";
import dotenv from "dotenv";
import cityRoutes from "./routes/city.route.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Express + TypeScript !");
});

app.use("/cities", cityRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
