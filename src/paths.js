import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT_DIR = path.resolve(__dirname, "..");
export const RESERVAS_FILE = path.join(ROOT_DIR, "reservas.json");
export const MY_WEEKLY_CLASSES = path.join(ROOT_DIR, "my_weekly_classes.json");
export const LOGS_DIR = path.join(ROOT_DIR, "logs");
