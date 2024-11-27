import { assert } from '#core/utils/assert';
import { die } from '#core/utils/die';
import { log } from '#core/utils/log';
import { quit } from '#core/utils/quit';

globalThis.log = log;
globalThis.die = die;
globalThis.quit = quit;
globalThis.assert = assert;
