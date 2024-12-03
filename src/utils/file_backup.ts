export class createBackup {
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
  public async fileExists(filePath: string): Promise<boolean> {
    try {
      await $.fs.promises.access(filePath);
      return true; // File exists
    } catch {
      return false; // File does not exist
    }
  }

  /**
   * Renames a file to a unique name if it already exists.
   *
   * @param filePath - The path of the file to rename.
   * @returns A Promise that resolves to the new unique file path.
   */
  public async renameFileIfExists(filePath: string): Promise<void> {
    if (await this.fileExists(filePath)) {
      const uniqueFilePath = await this.getUniqueBackupFilePath(filePath);
      await $.fs.promises.rename(filePath, uniqueFilePath);
      console.log(`File renamed to: ${uniqueFilePath}`);
    }
  }
}
