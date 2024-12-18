/* eslint-disable no-var */
import { ConfigManager } from './config.js';
import { CustomLogger } from './logger.js';

declare global {
  var log: CustomLogger;
  var configs: ConfigManager;
  function cwd(resolvePath?: string, join?: string): string;
}

export {};
