/**
 * @author MRB
 * @license MIT
 * @link https://github.com/S-MRB-S
 *
 * This module provides a LogFileChecker class that monitors log files for size limits.
 * If a log file exceeds its specified size, it renames the file to create a backup.
 * The class checks the log files at regular intervals.
 */

import { logDir } from '#core/init/requirements';

const __1M__ = 1 * 1024 * 1024; // 1MB
const __05M__ = 0.5 * 1024 * 1024; // 0.5MB

export class LogFileChecker {
  // A record mapping log file names to their maximum allowed sizes
  private logFiles: Record<string, number> = {
    'combined.log': __1M__,
    'error.log': __05M__,
    'core.log': __05M__,
  };

  /**
   * Constructor for the LogFileChecker class.
   * Sets up an interval to check and rename log files every 10 seconds.
   */
  public constructor() {
    setInterval(() => {
      void this.checkAndRenameLogFiles();
    }, 10000);
  }

  /**
   * Checks the log files and renames them if they exceed their maximum size.
   * Logs any errors encountered during the process.
   *
   * @returns A Promise that resolves when the check is complete.
   */
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

  /**
   * Checks the size of a specific log file and renames it if it exceeds the maximum size.
   *
   * @param fileName - The name of the log file to check.
   * @param maxSize - The maximum allowed size for the log file.
   * @returns A Promise that resolves when the check and potential rename is complete.
   */
  private async checkAndRenameFile(
    fileName: string,
    maxSize: number
  ): Promise<void> {
    const logFilePath = $.path.join(logDir, fileName);

    if (!(await this.fileExists(logFilePath))) return; // Exit if the file does not exist

    const stats = await $.fs.promises.stat(logFilePath);

    // Rename the file if it exceeds the maximum size
    if (stats.size > maxSize) {
      const backupFilePath = await this.getUniqueBackupFilePath(logFilePath);
      await $.fs.promises.rename(logFilePath, backupFilePath);
    }
  }

  /**
   * Generates a unique backup file path to avoid overwriting existing backups.
   *
   * @param basePath - The base path for the backup file.
   * @param counter - A counter to create unique file names (default is 1).
   * @returns A Promise that resolves to a unique backup file path.
   */
  private async getUniqueBackupFilePath(
    basePath: string,
    counter = 1
  ): Promise<string> {
    const backupFilePath =
      counter === 1 ? `${basePath}.bak` : `${basePath}.${counter}.bak`;

    if (await this.fileExists(backupFilePath)) {
      return this.getUniqueBackupFilePath(basePath, counter + 1); // Recursively find a unique path
    }

    return backupFilePath;
  }

  /**
   * Checks if a file exists at the specified path.
   *
   * @param filePath - The path of the file to check.
   * @returns A Promise that resolves to true if the file exists, false otherwise.
   */
  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await $.fs.promises.access(filePath);
      return true; // File exists
    } catch {
      return false; // File does not exist
    }
  }
}
