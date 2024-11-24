/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 */

// eslint-disable-next-line functional/immutable-data
globalThis.$ = await import('#lib/packages') as any;
// eslint-disable-next-line functional/immutable-data
globalThis.$ = { ...globalThis.$, ...await import('#lib/modules') };

/**
 * init file for index (current file)
 */
await import('#core/init/index');

$.core();

export {};
/**
 * اضافه کردن سورس های پایدار و ورژن بندی پایدار برای هسته
 * قابلیت اضافه کردن ماژول ها به هسته با قابلیت خطا پذیری برای هر ماژول
 *
 * اضافه کردن فورکر برای هر ورژن بندی بسته به تعداد و حداکثر
 */
