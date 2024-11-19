export function assert(err: string | undefined = 'undefined error'): void {
  log.error(err);
  try{
    // eslint-disable-next-line functional/no-throw-statement
    throw new Error(err);
  }finally{
    setTimeout(() => {
      quit();
    }, 1300); // 1.3s
  }
}
