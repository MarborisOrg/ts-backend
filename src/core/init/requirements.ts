// init, requirements

// const __filename = $.url.fileURLToPath(import.meta.url);
// export const __dirname = $.path.dirname(__filename); // این برای بدست اوردن مسیر فولدر های دیگه مثل بیلد یا دیست هست
export let logDir: string; // or __dirname

export class InitReq {
  public constructor() {
    logDir = $.path.join('log');
  }
  public init(): void {
    if (!$.fs.existsSync(logDir)) {
      $.fs.mkdirSync(logDir, { recursive: true });
    }
  }
}
