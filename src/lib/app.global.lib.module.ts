/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 * @license UNLICENSED
 * @description This module initializes libraries by loading packages and modules.
 * It provides a method to load and merge these libraries into a global object for easy access.
 */

import { loadLibraries } from './app.check.lib.module.check.js';

/**
 * Class responsible for initializing libraries in the application.
 */
export class InitLib {
  /**
   * Initializes the libraries by loading packages and modules.
   * Merges the loaded libraries into a global object for access throughout the application.
   *
   * @async
   * @returns {Promise<void>}
   */
  public async init(): Promise<void> {
    // Dynamically import the packages from the specified path
    const packages = await import('#lib/app.package.lib.js');
    // Load the libraries defined in the packages
    await loadLibraries(packages);
    // Assign the loaded packages to the global object
    globalThis.$ = packages as any;

    // Dynamically import the modules from the specified path
    const modules = await import('#lib/app.local.lib.js');
    // Load the libraries defined in the modules
    await loadLibraries(modules);
    // Merge the loaded modules with the existing global object
    globalThis.$ = { ...globalThis.$, ...modules };
  }
}
