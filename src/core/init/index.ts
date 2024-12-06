/**
 * @author MRB
 * @license UNLICENSED
 * @link https://github.com/S-MRB-S
 *
 * This module initializes core components of the application.
 * It loads requirements, sets up global utilities, checks log files, and configures exit handlers.
 */

import { InitGlobal } from '#core/global/index';
import { InitReq } from '#core/init/requirements';
import { LogFileChecker } from '#core/misc/logBakChecker';

export class InitCore {
  /**
   * Constructor for the InitCore class.
   * Automatically initializes core components upon instantiation.
   */
  public constructor() {
    this.initialize();
  }

  /**
   * Initializes core components of the application.
   * Loads requirements, global utilities, checks log files, and sets up exit handlers.
   */
  private initialize(): void {
    void this.loadRequirements(); // Load application requirements
    void this.loadGlobal(); // Load global utilities
    void this.checkLogFiles(); // Check and manage log files
    void this.setupExitHandler(); // Set up exit handlers for cleanup
  }

  /**
   * Loads application requirements by initializing the InitReq class.
   * Logs an error message if the initialization fails.
   */
  private loadRequirements(): void {
    try {
      new InitReq().init(); // Initialize requirements
    } catch (error) {
      echo('Error loading requirements:', error); // Log any errors encountered
    }
  }

  /**
   * Loads global utilities by initializing the InitGlobal class.
   * Logs an error message if the initialization fails.
   */
  private loadGlobal(): void {
    try {
      new InitGlobal(); // Initialize global utilities
    } catch (error) {
      echo('Error loading global:', error); // Log any errors encountered
    }
  }

  /**
   * Checks and manages log files by initializing the LogFileChecker class.
   * Logs an error message if the initialization fails.
   */
  private checkLogFiles(): void {
    try {
      new LogFileChecker(); // Initialize log file checker
    } catch (error) {
      echo('Error checking log files:', error); // Log any errors encountered
    }
  }

  /**
   * Sets up exit handlers by dynamically importing the onexit module.
   * Logs an error message if the import fails.
   */
  private setupExitHandler(): void {
    try {
      void import('#core/misc/onexit'); // Import exit handler module
    } catch (error) {
      echo('Error setting up exit handler:', error); // Log any errors encountered
    }
  }
}
