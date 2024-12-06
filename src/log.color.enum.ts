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
}
