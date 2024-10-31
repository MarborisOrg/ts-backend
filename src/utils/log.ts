import chalk from 'chalk';
import { getCurrentTime } from './time';

const echo = (whos: string, message: string): void => {
    console.log(chalk.white(`[${getCurrentTime()}]`) + ` [${chalk.cyan(whos)}] ${message}`);
};

// add globally
declare global {
    function echo(whos: string, message: string): void;
}

globalThis.echo = echo;
