type Library = any;
type Libraries = { [key: string]: Library };

export async function loadLibraries(libraries: Libraries): Promise<boolean> {
  const libraryKeys = Object.keys(libraries);

  const loadPromises = libraryKeys.map((key): any => {
    try {
      const library = libraries[key];
      echo(`Loaded ${key}`);
      return library;
    } catch (error) {
      console.error(`Error loading ${key}:`, error);
      throw error;
    }
  });

  try {
    await Promise.all(loadPromises);
    echo('All libraries loaded successfully');
    return true;
  } catch (error) {
    console.error(`Error loading:`, error);
    return false;
  }
}
