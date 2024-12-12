/* eslint-disable no-var */
import { ConfigManager } from './config';
import { CustomLogger } from './logger';

declare global {
  var log: CustomLogger;
  var configs: ConfigManager;
  function cwd(resolvePath = ''): string;
}

export {};
