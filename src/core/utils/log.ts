import winston from 'winston';

import { logDir } from '#core/init/requirements';

export interface CustomLogger extends winston.Logger {
  core: (message: string) => void;
}

$.winston.addColors({
  core: 'magenta',
  error: 'red',
  warn: 'yellow',
  debug: 'blue',
  info: 'green',
});

const LogLevels = {
  core: 0,
  error: 1,
  warn: 2,
  debug: 3,
  info: 4,
} as const;

const createFileTransport = (
  level: keyof typeof LogLevels,
  filename: string
): winston.transports.FileTransportInstance => {
  return new $.winston.transports.File({
    filename: $.path.join(logDir, filename),
    level,
    handleExceptions: true,
    format: $.winston.format.combine(
      $.winston.format((info) => {
        if (info.level !== level) {
          return false;
        }
        return info;
      })()
    ),
  });
};

const customFormat = $.winston.format.printf(
  ({ timestamp, level, message }) => {
    let messageString: string;

    if (typeof message === 'string') {
      messageString = message;
    } else {
      messageString = JSON.stringify(message);
    }

    if (messageString.length > 100) {
      messageString = messageString.substring(0, 100) + '...';
    }

    return `${timestamp} ${level}: ${messageString}`;
  }
);

const formatTimestamp = (): string => {
  const date = new Date();
  return date.toISOString().replace('T', ' ').substring(0, 19);
};

const commonFormat = $.winston.format.combine(
  $.winston.format.timestamp({ format: formatTimestamp }),
  $.winston.format.json(),
  customFormat
);

/**
 * This is a log saver (no database) with Winston.
 */
const logger = $.winston.createLogger({
  levels: LogLevels,
  level: 'info',
  exitOnError: false,
  // format message on file (.log file)
  format: $.winston.format.combine(
    $.winston.format.timestamp({ format: formatTimestamp }),
    $.winston.format.json()
    // no need color for saving on file
  ),
  transports: [
    new $.winston.transports.Console({
      format: $.winston.format.combine(
        $.winston.format.colorize(),
        commonFormat
      ),
    }),
    createFileTransport('core', 'core.log'),
    createFileTransport('error', 'error.log'),
    new $.winston.transports.File({
      filename: $.path.join(logDir, 'combined.log'),
      level: 'info',
      handleExceptions: true,
      format: $.winston.format.combine(
        $.winston.format((info) => {
          if (info.level === 'core' || info.level === 'error') {
            return false;
          }
          return info;
        })()
      ),
    }),
  ],
});

export const log: CustomLogger = logger as CustomLogger;

log.core = (message: string | object | any): void => {
  log.log('core', { message });
};

// Example log messages
// log.debug('This is a debug message');
// log.info('This is an info message');
// log.warn('This is a warning message');
// log.error('This is an error message');
// log.core('core dumped');
