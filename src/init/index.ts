import "#utils/requirements";

await import("#utils/global/index");

import "#misc/onexit"
import { checkAndRenameLogFile } from "#misc/logBakChecker";

(async function(){
    await checkAndRenameLogFile()
})()