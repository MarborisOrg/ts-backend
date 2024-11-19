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
   * This function creates (throw new Error) with your message, creates a log, and if doNotQuit == true, then closes the application after 1 second.
   * @param err default msg: undefined error
   * @param doNotQuit default: false | undefined
   */
  function assert(err: string, doNotQuit?: boolean): void;
}

export {};
