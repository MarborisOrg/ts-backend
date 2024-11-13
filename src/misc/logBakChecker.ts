// log file size checker

import { logDir } from "#utils/requirements";
import fs from "fs/promises";
import path from "path";

const logFilePath = path.join(logDir, "combined.log");

export async function checkAndRenameLogFile() {
  try {
    const stats = await fs.stat(logFilePath);

    if (stats.size > 1 * 1024 * 1024) {
      // 1mg
      let backupFilePath = `${logFilePath}.bak`;
      let counter = 1;

      while (await fileExists(backupFilePath)) {
        backupFilePath = `${logFilePath}.${counter}.bak`;
        counter++;
      }

      await fs.rename(logFilePath, backupFilePath);
      console.log(`Backup file renamed to: ${backupFilePath}`);
    }
  } catch (error) {
    console.error("Error checking or renaming file:", error);
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
