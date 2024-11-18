import '#utils/requirements';

await import('#utils/global/index');

import '#core/misc/onexit';
import { checkAndRenameLogFile } from '#core/misc/logBakChecker';

(async function () {
  await checkAndRenameLogFile();
})();
