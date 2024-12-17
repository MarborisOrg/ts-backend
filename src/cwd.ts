import path from 'path'

/**
 * Generates an absolute path by resolving the current working directory
 * and optionally joining additional paths.
 *
 * @param resolvePath - Optional relative path to resolve from the current working directory.
 * @param join - Optional path segment to join to the resolved path.
 * @returns Absolute path as a string.
 */
export const cwd = (resolvePath?: string, join?: string): string => {
  // Ensure parameters are strings or default to empty strings
  const resolvedPath = path.resolve(process.cwd(), resolvePath || '')

  // Only join if join is provided
  return join ? path.join(resolvedPath, join) : resolvedPath
}
