// init, requirements
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename); // این برای بدست اوردن مسیر فولدر های دیگه مثل بیلد یا دیست هست
export const logDir = path.join("log"); // or __dirname

(function() {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
})()
