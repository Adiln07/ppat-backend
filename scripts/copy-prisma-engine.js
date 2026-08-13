import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");

const sourceDir = path.join(projectRoot, "src", "generated", "prisma");

const targetDir = path.join(projectRoot, "dist", "generated", "prisma");

if (!fs.existsSync(sourceDir)) {
  throw new Error(`Prisma generated directory not found: ${sourceDir}`);
}

fs.mkdirSync(targetDir, { recursive: true });

const files = fs.readdirSync(sourceDir);

const engineFiles = files.filter(
  (file) => file.includes("query_engine") && file.endsWith(".node"),
);

console.log("Prisma generated files:");
console.log(files);

console.log("Prisma engine files:");
console.log(engineFiles);

if (engineFiles.length === 0) {
  throw new Error(
    "Prisma Query Engine was not found in the generated Prisma directory.",
  );
}

for (const file of engineFiles) {
  fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));

  console.log(`Copied Prisma engine: ${file}`);
}

console.log("Prisma Query Engine copied successfully.");
