import '#core/utils/requirements';

await import('#core/global/index');

import { checkAndRenameLogFiles } from '#core/misc/logBakChecker';
import '#core/misc/onexit';

(async function () {
  await checkAndRenameLogFiles();
})();
