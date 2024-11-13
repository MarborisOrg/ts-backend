import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

interface Args {
  dev?: boolean;
}

let mode: string = "";

export function getEnvMode(): string {
  if (mode == "" || mode == null) {
    const argv = yargs(hideBin(process.argv)).options({
      dev: { type: "boolean", default: false },
    }).argv as Args;

    const env = argv.dev ? "development" : "production";

    if (env === "production") {
      mode = ".env";
      return ".env";
    } else {
      mode = ".env.dev";
      return ".env.dev";
    }
  } else {
    return mode;
  }
}
