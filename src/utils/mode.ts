import { hideBin } from 'yargs/helpers';

type Args = {
  readonly dev?: boolean;
};

let mode = '';

export function getMode(): string {
  if (mode == '' || mode == null) {
    const argv = $.yargs(hideBin(process.argv)).options({
      dev: { type: 'boolean', default: false },
    }).argv as Args;

    mode = argv.dev ? 'development' : 'production';

    return mode;
  } else {
    return mode;
  }
}
