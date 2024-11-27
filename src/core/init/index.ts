import '#core/utils/requirements';

await import('#core/global/index');

import { checkAndRenameLogFiles } from '#core/misc/logBakChecker';
import '#core/misc/onexit';

void (async function (): Promise<void> {
  await checkAndRenameLogFiles();
})();
