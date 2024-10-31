import chalk from 'chalk';
import { getCallerInfo } from './caller';
import { getCurrentTime } from './time';

const echo = (message: string): void => {
    const callerFile = getCallerInfo();
    console.log(chalk.white(`[${getCurrentTime()}]`) + ` [${chalk.cyan(callerFile)}] ${message}`);
};

declare global {
    function echo(message: string): void;
}

globalThis.echo = echo;
