// log file size checker

import { logDir } from '#core/init/requirements';

const __1M__ = 1 * 1024 * 1024; // 1MB
const __05M__ = 0.5 * 1024 * 1024; // 0.5MB

export class LogFileChecker {
  private logFiles: Record<string, number> = {
    'combined.log': __1M__,
    'error.log': __05M__,
    'core.log': __05M__,
  };

  public constructor() {
    setInterval(() => {
      void this.checkAndRenameLogFiles();
    }, 10000);
  }

  private async checkAndRenameLogFiles(): Promise<void> {
    try {
      const results = await Promise.allSettled(
        Object.entries(this.logFiles).map(([fileName, maxSize]) =>
          this.checkAndRenameFile(fileName, maxSize)
        )
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

  private async checkAndRenameFile(
    fileName: string,
    maxSize: number
  ): Promise<void> {
    const logFilePath = $.path.join(logDir, fileName);

    if (!(await this.fileExists(logFilePath))) return;

    const stats = await $.fs.promises.stat(logFilePath);

    if (stats.size > maxSize) {
      const backupFilePath = await this.getUniqueBackupFilePath(logFilePath);
      await $.fs.promises.rename(logFilePath, backupFilePath);
    }
  }

  private async getUniqueBackupFilePath(
    basePath: string,
    counter = 1
  ): Promise<string> {
    const backupFilePath =
      counter === 1 ? `${basePath}.bak` : `${basePath}.${counter}.bak`;

    if (await this.fileExists(backupFilePath)) {
      return this.getUniqueBackupFilePath(basePath, counter + 1);
    }

    return backupFilePath;
  }

  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await $.fs.promises.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
