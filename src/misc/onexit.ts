// clean up app when quit
// note: die (failor exit) doesnt support async
import { freeAll } from "#free/index";

process.on('exit', (code) => {
    freeAll()
});

process.on('SIGINT', async () => {
    await freeAll()
    quit()
});

process.on('SIGTERM', async () => {
    await freeAll()
    quit()
});
