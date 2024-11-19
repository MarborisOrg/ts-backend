// log file size checker

import fs from 'fs/promises';
import path from 'path';

import { logDir } from '#utils/requirements';

const logFilePath = path.join(logDir, 'combined.log');

export async function checkAndRenameLogFile() {
  try {
    if (!(await fileExists(logFilePath))) return;

    const stats = await fs.stat(logFilePath);

    if (stats.size > 1 * 1024 * 1024) {
      // 1MB
      let backupFilePath = `${logFilePath}.bak`;
      let counter = 1;

      await Promise.all(
        Array.from({ length: counter }, () =>
          fileExists(backupFilePath).then((exists) => {
            if (exists) {
              backupFilePath = `${logFilePath}.${counter}.bak`;
              counter++;
            }
          }),
        ),
      );

      await fs.rename(logFilePath, backupFilePath);
    }
  } catch (error) {
    log.error('Error checking or renaming file:', error);
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
