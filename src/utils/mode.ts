import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

type Config = {
  dev: boolean;
  debug: boolean;
  type: 'express' | 'rabbit' | 'database';
};

let config: Config | undefined;

export function getConfig(): Config {
  if (!config) {
    const argv = yargs(hideBin(process.argv)).options({
      dev: { type: 'boolean', default: false },
      debug: { type: 'boolean', default: false },
      type: {
        type: 'string',
        choices: ['express', 'rabbit', 'database'],
        default: 'express',
      },
    }).argv as unknown as {
      dev: boolean;
      debug: boolean;
      type: 'express' | 'rabbit' | 'database';
    };

    config = {
      dev: argv.dev,
      debug: argv.debug,
      type: argv.type,
    };

    console.log(`Debug mode: ${config.debug}`);
    console.log(`Type: ${config.type}`);
  }

  return config;
}
