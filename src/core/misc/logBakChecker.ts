/**
 * @author MRB
 * @license UNLICENSED
 * @link https://github.com/S-MRB-S
 *
 * This module provides a LogFileChecker class that monitors log files for size limits.
 * If a log file exceeds its specified size, it renames the file to create a backup.
 * The class checks the log files at regular intervals.
 */

import { logDir } from '#core/init/requirements';
import { createBackup } from '#utils/file_backup';

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

    const cb = new createBackup();

    if (!(await cb.fileExists(logFilePath))) return; // Exit if the file does not exist

    const stats = await $.fs.promises.stat(logFilePath);

    // Rename the file if it exceeds the maximum size
    if (stats.size > maxSize) {
      await cb.renameFileIfExists(logFilePath);
    }
  }
}
