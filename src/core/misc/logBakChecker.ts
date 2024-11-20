// log file size checker

import fs from 'fs/promises';
import path from 'path';

import { logDir } from '#utils/requirements';

const logFiles = {
  'combined.log': 1 * 1024 * 1024, // 1MB
  'error.log': 0.5 * 1024 * 1024, // 0.5MB
};

export async function checkAndRenameLogFiles() {
  try {
    const results = await Promise.allSettled(
      Object.entries(logFiles).map(async ([fileName, maxSize]) => {
        const logFilePath = path.join(logDir, fileName);

        if (!(await fileExists(logFilePath))) return;

        const stats = await fs.stat(logFilePath);

        if (stats.size > maxSize) {
          const backupFilePath = await getUniqueBackupFilePath(logFilePath);
          await fs.rename(logFilePath, backupFilePath);
        }
      }),
    );

    results.forEach((result) => {
      if (result.status === 'rejected') {
        log.error('Error checking or renaming file:', result.reason);
      }
    });
  } catch (error) {
    log.error('Unexpected error:', error);
  }
}

async function getUniqueBackupFilePath(
  basePath: string,
  counter = 1,
): Promise<string> {
  const backupFilePath =
    counter === 1 ? `${basePath}.bak` : `${basePath}.${counter}.bak`;

  if (await fileExists(backupFilePath)) {
    return getUniqueBackupFilePath(basePath, counter + 1);
  }

  return backupFilePath;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
