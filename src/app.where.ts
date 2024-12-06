export function whereIsHere(resolvePath: string = ''): string {
  let dirName: string;
  if ($.config.anchor) {
    const __filename = $.url.fileURLToPath(import.meta.url);
    const appDir = $.path.resolve($.path.dirname(__filename), '../../');
    dirName = $.path.resolve(appDir, resolvePath);
  } else {
    dirName = $.path.resolve(process.cwd(), resolvePath);
  }
  return dirName;
}

export function where(): void {
  if ($.config.where) {
    console.log(whereIsHere());
    process.exit();
  }
}
