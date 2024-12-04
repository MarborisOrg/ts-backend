let dirName: string;
export function whereIsHere(resolve: string = ''): string {
  if (dirName === undefined || dirName === null) {
    const __filename = $.url.fileURLToPath(import.meta.url);
    dirName = $.path.resolve($.path.dirname(__filename), '../../' + resolve);
  }
  return dirName;
}
