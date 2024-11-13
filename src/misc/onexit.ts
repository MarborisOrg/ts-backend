process.on('exit', (code) => {
    console.log(`exit code: ${code}`);
});

process.on('SIGINT', () => {
    console.log('SIGINT (Ctrl+C)');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM');
    process.exit(0);
});
