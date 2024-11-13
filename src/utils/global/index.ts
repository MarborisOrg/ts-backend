import { log } from "#utils/log";
import { die } from "#utils/die";
import { quit } from "#utils/quit";

globalThis.log = log;
globalThis.die = die;
globalThis.quit = quit;
