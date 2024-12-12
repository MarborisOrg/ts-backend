import path from 'path';

export function cwd(resolvePath = ''): string {
  return path.resolve(process.cwd(), resolvePath);
}
