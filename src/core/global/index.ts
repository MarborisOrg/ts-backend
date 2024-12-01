import { assert } from '#core/utils/assert';
import { die } from '#core/utils/die';
import { log } from '#core/utils/log';
import { quit } from '#core/utils/quit';

globalThis.log = log;
// die/quit need log
globalThis.die = die;
globalThis.quit = quit;
// assert need quit, log
globalThis.assert = assert;
