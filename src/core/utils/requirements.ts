// init, requirements

const __filename = $.url.fileURLToPath(import.meta.url);
export const __dirname = $.path.dirname(__filename); // این برای بدست اوردن مسیر فولدر های دیگه مثل بیلد یا دیست هست
export const logDir = $.path.join('log'); // or __dirname

void (function (): void {
  if (!$.fs.existsSync(logDir)) {
    $.fs.mkdirSync(logDir, { recursive: true });
  }
})();
