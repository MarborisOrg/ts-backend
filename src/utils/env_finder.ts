import * as fs from "fs";
import * as path from "path";
import { getMode } from "./mode.js";

const findEnvFileInSubdirectories = (startDir: string): string | null => {
  const files = fs.readdirSync(startDir);

  let envPath
  if (getMode() === "production") {
    envPath = ".env";
  } else {
    envPath = ".env.dev";
  }

  if (files.includes(envPath)) {
    return path.join(startDir, envPath);
  }

  for (const file of files) {
    const fullPath = path.join(startDir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const envPath = findEnvFileInSubdirectories(fullPath);
      if (envPath) {
        return envPath;
      }
    }
  }

  return null;
};

export const envFilePath = findEnvFileInSubdirectories(process.cwd());
