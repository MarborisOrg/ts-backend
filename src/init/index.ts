import '#core/utils/requirements';

await import('#core/utils/global/index');

import '#core/misc/onexit';
import { checkAndRenameLogFiles } from '#core/misc/logBakChecker';

(async function () {
  await checkAndRenameLogFiles();
})();
