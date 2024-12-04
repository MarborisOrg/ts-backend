/**
 * Enum representing log colors for console output.
 * Each color corresponds to a specific ANSI escape code.
 */
export enum LogColor {
  Default = '\x1b[0m',

  // Basic colors
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Magenta = '\x1b[35m',
  Cyan = '\x1b[36m',
  White = '\x1b[37m',
  Black = '\x1b[30m',

  // Bright colors
  BrightRed = '\x1b[91m',
  BrightGreen = '\x1b[92m',
  BrightYellow = '\x1b[93m',
  BrightBlue = '\x1b[94m',
  BrightMagenta = '\x1b[95m',
  BrightCyan = '\x1b[96m',
  BrightWhite = '\x1b[97m',

  // Background colors
  BgRed = '\x1b[41m',
  BgGreen = '\x1b[42m',
  BgYellow = '\x1b[43m',
  BgBlue = '\x1b[44m',
  BgMagenta = '\x1b[45m',
  BgCyan = '\x1b[46m',
  BgWhite = '\x1b[47m',
  BgBlack = '\x1b[40m',

  // Bright background colors
  BgBrightRed = '\x1b[101m',
  BgBrightGreen = '\x1b[102m',
  BgBrightYellow = '\x1b[103m',
  BgBrightBlue = '\x1b[104m',
  BgBrightMagenta = '\x1b[105m',
  BgBrightCyan = '\x1b[106m',
  BgBrightWhite = '\x1b[107m',

  // Combined colors
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

  // Bold and Underline
  Bold = '\x1b[1m',
  Underline = '\x1b[4m',
  Inverse = '\x1b[7m',

  // Dark colors
  DarkRed = '\x1b[38;5;88m',
  DarkGreen = '\x1b[38;5;22m',
  DarkYellow = '\x1b[38;5;136m',
  DarkBlue = '\x1b[38;5;24m',
  DarkMagenta = '\x1b[38;5;125m',
  DarkCyan = '\x1b[38;5;36m',
  DarkWhite = '\x1b[38;5;250m',

  // Additional bright colors
  BrightOrange = '\x1b[38;5;208m',
  BrightPink = '\x1b[38;5;201m',

  // Additional background colors
  BgDarkRed = '\x1b[48;5;88m',
  BgDarkGreen = '\x1b[48;5;22m',
  BgDarkYellow = '\x1b[48;5;136m',
  BgDarkBlue = '\x1b[48;5;24m',
  BgDarkMagenta = '\x1b[48;5;125m',
  BgDarkCyan = '\x1b[48;5;36m',
  BgDarkWhite = '\x1b[48;5;250m',

  // Additional combined colors
  LightSeaGreen = '\x1b[38;5;37m',
  LightSlateGray = '\x1b[38;5;245m',
  LightSalmon = '\x1b[38;5;210m',
  LightSlateBlue = '\x1b[38;5;63m',
}

// Example usage
console.log(`${LogColor.LightPink}This is light pink text${LogColor.Default}`);
console.log(
  `${LogColor.LightOrange}This is light orange text${LogColor.Default}`
);
console.log(
  `${LogColor.LightYellowGreen}This is light yellow-green text${LogColor.Default}`
);
console.log(
  `${LogColor.BgBrightBlue}${LogColor.White}This is white text on a bright blue background${LogColor.Default}`
);
console.log(
  `${LogColor.LightSkyBlue}${LogColor.Bold}This is bold light sky blue text${LogColor.Default}`
);
console.log(
  `${LogColor.LightTeal}${LogColor.Underline}This is underlined light teal text${LogColor.Default}`
);
