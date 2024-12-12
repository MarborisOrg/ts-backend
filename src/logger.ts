import path from 'path'
import winston from 'winston'

import { Singleton } from './decorators.js'

// Type Definitions
export interface CustomLogger extends winston.Logger {
  core: (message: string | object) => void
}

// Logger Manager
@Singleton
export class LoggerManager {
  private logger: CustomLogger

  public constructor(logDir: string, debug: boolean) {
    if (!logDir || typeof logDir !== 'string') {
      throw new TypeError('Invalid log directory provided.')
    }

    const logLevels = { core: 0, error: 1, warn: 2, debug: 3, info: 4 }

    const createFileTransport = (
      level: keyof typeof logLevels,
      fileName: string
    ): winston.transports.FileTransportInstance =>
      new winston.transports.File({
        filename: path.join(logDir, fileName),
        level,
      })

    const customTimestampFormat = winston.format.printf(
      ({ timestamp, level, message }) => {
        const customTimeMsg = `[${timestamp}] ${level}: '${message}'`
        if (debug) {
          console.log(customTimeMsg)
        }
        return customTimeMsg
      }
    )

    this.logger = winston.createLogger({
      levels: logLevels,
      format: winston.format.combine(
        winston.format.timestamp({
          format: () => new Date().toLocaleString(),
        }),
        customTimestampFormat
      ),
      transports: [
        createFileTransport('core', 'core.log'),
        createFileTransport('error', 'error.log'),
        createFileTransport('info', 'combined.log'),
      ],
    }) as CustomLogger

    this.logger.core = (message: string | object): string | object =>
      this.logger.log('core', message)
  }

  public getLogger(): CustomLogger {
    return this.logger
  }
}
