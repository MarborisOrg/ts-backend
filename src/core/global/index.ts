/* eslint-disable functional/immutable-data */
import { die } from '#core/utils/die';
import { log } from '#core/utils/log';
import { assert } from '#utils/assert';
import { quit } from '#utils/quit';

globalThis.$ = await import('#lib/packages');
globalThis.log = log;
globalThis.die = die;
globalThis.quit = quit;
globalThis.assert = assert;
