/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 */

/**
 * init global lib
 */
await import('#lib/index');

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
