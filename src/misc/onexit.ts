process.on('exit', (code) => {
    console.log(`خروج با کد: ${code}`);
});

process.on('SIGINT', () => {
    console.log('دریافت سیگنال SIGINT (Ctrl+C)');
    // process.exit(0);
});
