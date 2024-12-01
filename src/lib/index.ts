import { loadLibraries } from './check.js';

export class InitLib {
  public async init(): Promise<void> {
    const packages = await import('#lib/packages');
    await loadLibraries(packages);
    globalThis.$ = packages as any;
    const modules = await import('#lib/modules');
    await loadLibraries(modules);
    globalThis.$ = { ...globalThis.$, ...modules };
  }
}
