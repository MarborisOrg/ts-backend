// global.d.ts
import { Logger } from 'winston';

declare global {

  /**
   * This is a log saver (no database) with Winston.
   */
  var log: Logger;

  /**
   * This function closes the program immediately and ignores everything.
   */
  function die(): void;

  /**
   * This function closes the application safely.
   */
  function quit(): void;

  /**
   * Assert
   * @param err This function creates (throw new Error) with your message, creates a log, and closes the application after 1 second.
   */
  function assert(err?: string): void;
}

export {};
