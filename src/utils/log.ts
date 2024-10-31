import chalk from 'chalk';
import { getCallerInfo } from './caller';
import { getCurrentTime } from './time';

const log = (message: string): void => {
    const callerFile = getCallerInfo();
    console.log(chalk.white(`[${getCurrentTime()}]`) + ` [${chalk.cyan(callerFile)}] ${message}`);
};

export { log };
