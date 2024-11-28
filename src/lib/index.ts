globalThis.$ = (await import('#lib/packages')) as any;
globalThis.$ = { ...globalThis.$, ...(await import('#lib/modules')) };

export {};
