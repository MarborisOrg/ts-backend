import { die } from '#utils/die';
import { log } from '#utils/log';
import { quit } from '#utils/quit';

globalThis.log = log;
globalThis.die = die;
globalThis.quit = quit;
