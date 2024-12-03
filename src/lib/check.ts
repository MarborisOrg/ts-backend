/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 * @license MIT
 * @description This module provides a function to load multiple libraries asynchronously.
 * It handles success and error logging for each library load attempt.
 */

type Library = any; // Type definition for a generic library
type Libraries = { [key: string]: Library }; // Type definition for an object containing libraries

/**
 * Loads the specified libraries asynchronously.
 * Logs the success or failure of each library load attempt.
 *
 * @param {Libraries} libraries - An object containing libraries to be loaded.
 * @returns {Promise<boolean>} - A promise that resolves to true if all libraries are loaded successfully, otherwise false.
 */
export async function loadLibraries(libraries: Libraries): Promise<boolean> {
  const libraryKeys = Object.keys(libraries); // Get the keys of the libraries object

  // Create an array of promises for loading each library
  const loadPromises = libraryKeys.map((key): any => {
    try {
      const library = libraries[key]; // Access the library by key
      echo(`Success: Loaded ${key}`); // Log success message
      return library; // Return the loaded library
    } catch (error) {
      console.error(`Error loading ${key}:`, error); // Log error message
      throw error; // Rethrow the error to be caught later
    }
  });

  try {
    await Promise.all(loadPromises); // Wait for all load promises to resolve
    echo('Debug: All libraries loaded successfully'); // Log debug message
    return true; // Return true if all libraries loaded successfully
  } catch (error) {
    console.error(`Error loading:`, error); // Log error message for any failed loads
    return false; // Return false if any library failed to load
  }
}
