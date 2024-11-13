import { freeAll } from "#free/index";

process.on('exit', (code) => {
    console.log(`app closed code: ${code}`);
});

process.on('SIGINT', async () => {
    await freeAll()
    quit()
});

process.on('SIGTERM', async () => {
    await freeAll()
    quit()
});
