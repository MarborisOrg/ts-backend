/**
 * @author MRB
 * @license MIT
 * @link https://github.com/S-MRB-S
 *
 * This module initializes the logging requirements for the application.
 * It sets up the log directory and ensures that it exists before logging operations.
 */

export let logDir: string; // Directory path for log files

export class InitReq {
  /**
   * Constructor for the InitReq class.
   * Initializes the log directory path.
   */
  public constructor() {
    logDir = $.path.join('log'); // Set the log directory to 'log'
  }

  /**
   * Initializes the log directory.
   * Creates the log directory if it does not already exist.
   * Logs an informational message when the directory is created.
   */
  public init(): void {
    if (!$.fs.existsSync(logDir)) {
      $.fs.mkdirSync(logDir, { recursive: true }); // Create the log directory recursively
      echo('Info: Make log dir!'); // Log information about the directory creation
    }
  }
}
