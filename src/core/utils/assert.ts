/**
 * This function creates (throw new Error) with your message, creates a log, and if doNotQuit == true, then closes the application after 1 second.
 * @param err default msg: undefined error
 * @param doNotQuit default: false | undefined
 */
export function assert(err: string | undefined = 'undefined error', doNotQuit?: boolean): void {
  log.error(err);
  try {
    throw new Error(err);
  } finally {
    if (!doNotQuit) {
      setTimeout(() => {
        quit();
      }, 1300); // 1.3s
    }
  }
}
