enum LogColor {
  Default = '\x1b[0m',
  Bold = '\x1b[1m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Magenta = '\x1b[35m',
  Cyan = '\x1b[36m',
  White = '\x1b[37m',
  BrightRed = '\x1b[91m',
  BrightGreen = '\x1b[92m',
  BrightYellow = '\x1b[93m',
  BrightBlue = '\x1b[94m',
  BrightMagenta = '\x1b[95m',
  LightOrange = '\x1b[38;5;214m',
}

const colorMapping: Record<any, LogColor> = {
  err: LogColor.Red,
  error: LogColor.Red,
  info: LogColor.Green,
  warn: LogColor.Yellow,
  debug: LogColor.Blue,
  success: LogColor.Cyan,
  critical: LogColor.BrightRed,
  app: LogColor.Green,
  start: LogColor.BrightGreen,
};

function colorizeTag(tag: string): string {
  const normalizedTag = tag.replace(/[^a-zA-Z]/g, '').toLowerCase();
  const color = colorMapping[normalizedTag];
  return color ? `${color}[${tag}]${LogColor.Default}` : `[${tag}]`;
}

function colorizeWord(word: string): string {
  const lowerCaseWord = word.toLowerCase();
  for (const [key, color] of Object.entries(colorMapping)) {
    if (lowerCaseWord.includes(key)) {
      return `${color}${word}${LogColor.Default}`;
    }
  }
  return word;
}

function colorizeMessage(message: string): string {
  return message
    .replace(/\[([^\]]+)\]/g, (_match, p1) => colorizeTag(p1))
    .split(' ')
    .map(colorizeWord)
    .join(' ');
}

const originalConsoleLog = console.log;

class LRUCache<K, V> {
  private capacity: number;
  private map: Map<K, V>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key: K): V | undefined {
    if (!this.map.has(key)) return undefined;
    const value = this.map.get(key)!;
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  set(key: K, value: V): void {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      const firstKey = this.map.keys().next().value;
      if (firstKey !== undefined) {
        this.map.delete(firstKey);
      }
    }
    this.map.set(key, value);
  }
}

const cache = new LRUCache<string, string>(250);

console.log = (...args: any[]) => {
  const coloredArgs = args.map((arg) => {
    if (typeof arg === 'string') {
      const cachedMessage = cache.get(arg);
      if (cachedMessage) {
        return cachedMessage;
      }

      if (
        !/(\[.*?\]|\b(?:err|error|info|warn|debug|success|critical|app|start)\b)/i.test(
          arg
        )
      ) {
        return arg;
      }

      const processed = colorizeMessage(arg);
      cache.set(arg, processed);
      return processed;
    }
    return arg;
  });

  originalConsoleLog.apply(console, coloredArgs);
};
