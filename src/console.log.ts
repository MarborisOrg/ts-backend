enum LogColor {
  Default = '\x1b[0m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Magenta = '\x1b[35m',
  Cyan = '\x1b[36m',
  White = '\x1b[37m',
  Black = '\x1b[30m',

  BrightRed = '\x1b[91m',
  BrightGreen = '\x1b[92m',
  BrightYellow = '\x1b[93m',
  BrightBlue = '\x1b[94m',
  BrightMagenta = '\x1b[95m',
  BrightCyan = '\x1b[96m',
  BrightWhite = '\x1b[97m',

  LightPink = '\x1b[38;5;200m',
  LightOrange = '\x1b[38;5;214m',
  LightYellowGreen = '\x1b[38;5;190m',
  LightSkyBlue = '\x1b[38;5;153m',
  LightPurple = '\x1b[38;5;129m',
  LightTeal = '\x1b[38;5;38m',
  LightLavender = '\x1b[38;5;189m',
  LightCoral = '\x1b[38;5;196m',
  LightMint = '\x1b[38;5;82m',
  LightGold = '\x1b[38;5;220m',

  Bold = '\x1b[1m',
  Underline = '\x1b[4m',
  Inverse = '\x1b[7m',

  DarkRed = '\x1b[38;5;88m',
  DarkGreen = '\x1b[38;5;22m',
  DarkYellow = '\x1b[38;5;136m',
  DarkBlue = '\x1b[38;5;24m',
  DarkMagenta = '\x1b[38;5;125m',
  DarkCyan = '\x1b[38;5;36m',
  DarkWhite = '\x1b[38;5;250m',

  BrightOrange = '\x1b[38;5;208m',
  BrightPink = '\x1b[38;5;201m',
}

const colorMapping: { [key: string]: string } = {
  err: LogColor.Red,
  error: LogColor.Red,
  throw: LogColor.Red,
  info: LogColor.Green,
  warn: LogColor.Yellow,
  debug: LogColor.Blue,
  success: LogColor.Cyan,
  core: LogColor.Magenta,
  critical: LogColor.BrightRed,
  notice: LogColor.BrightYellow,
  alert: LogColor.BrightMagenta,
  failure: LogColor.DarkRed,
  pending: LogColor.LightOrange,
  completed: LogColor.BrightGreen,
  test: LogColor.LightSkyBlue,
  update: LogColor.LightPurple,
};

function colorizeMessage(message: string): string {
  return message
    .replace(/\[([^\]]+)\]/g, (match, p1) => {
      const color = colorMapping[p1.toLowerCase()];
      if (color) {
        return `${color}[${p1}]${LogColor.Default}`;
      }
      return match;
    })
    .split(' ')
    .map((word) => {
      const lowerCaseWord = word.toLowerCase();
      const color = colorMapping[lowerCaseWord];
      return color ? `${color}${word}${LogColor.Default}` : word;
    })
    .join(' ');
}

const originalConsoleLog = console.log;

console.log = (...args: any[]) => {
  const coloredArgs = args.map((arg) => {
    if (typeof arg === 'string') {
      return colorizeMessage(arg);
    }
    return arg;
  });

  originalConsoleLog.apply(console, coloredArgs);
};
