/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 * @license MIT
 * @description This module provides a function to search for a .env file in the specified directory and its subdirectories.
 * It returns the path to the found .env file or null if not found.
 */

import { config } from './mode.js';

/**
 * Searches for a .env file in the specified directory and its subdirectories.
 * The filename is determined based on the development mode.
 *
 * @param {string} startDir - The directory to start the search from.
 * @returns {string | null} - The path to the found .env file or null if not found.
 */
export const findEnvFileInSubdirectories = (
  startDir: string
): string | null => {
  const files = $.fs.readdirSync(startDir); // Read the contents of the directory
  const envPath = config.dev ? '.env.dev' : '.env'; // Determine the .env file name based on the environment

  // Check if the .env file exists in the current directory
  if (files.includes(envPath)) {
    return $.path.join(startDir, envPath); // Return the full path if found
  }

  // Use reduce to search through files for a directory containing the .env file
  const foundPath = files.reduce<string | null>((acc, file) => {
    if (acc) return acc; // If a path has already been found, return it

    const fullPath = $.path.join(startDir, file); // Get the full path of the file
    const stat = $.fs.statSync(fullPath); // Get the file statistics

    // If the file is a directory, recursively search in that directory
    if (stat.isDirectory()) {
      return findEnvFileInSubdirectories(fullPath);
    }

    return null; // Return null if the file is not a directory
  }, null);

  return foundPath; // Return the found path or null if not found
};
