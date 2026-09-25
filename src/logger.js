import fs from "fs";
import path from "path";
import { LOGS_DIR } from "./paths.js";

fs.mkdirSync(LOGS_DIR, { recursive: true });

export function log(message, file) {
  const date = new Date().toISOString();

  const line = `[${date} ${message}]\n`;
  console.log(line.trim());

  fs.appendFileSync(path.join(LOGS_DIR, file), line, "utf-8");
}
