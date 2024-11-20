/* eslint-disable functional/immutable-data */
import { assert } from '#utils/assert';
import { die } from '#utils/die';
import { log } from '#utils/log';
import { quit } from '#utils/quit';

globalThis.lib = await import('#lib/packages');
globalThis.log = log;
globalThis.die = die;
globalThis.quit = quit;
globalThis.assert = assert;
