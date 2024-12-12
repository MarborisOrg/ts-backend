import path from 'path'

export const cwd = (resolvePath = ''): string => {
  return path.resolve(process.cwd(), resolvePath)
}
