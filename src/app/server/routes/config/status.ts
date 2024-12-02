// utils/httpStatus.js
export const HttpStatus = {
  OK: { code: 200, message: 'Success' }, // 200: موفقیت
  CREATED: { code: 201, message: 'Resource created' }, // 201: منبع ایجاد شد
  NO_CONTENT: { code: 204, message: 'No content' }, // 204: محتوایی وجود ندارد
  BAD_REQUEST: { code: 400, message: 'Bad request' }, // 400: درخواست نادرست
  UNAUTHORIZED: { code: 401, message: 'Unauthorized' }, // 401: غیرمجاز
  FORBIDDEN: { code: 403, message: 'Forbidden' }, // 403: ممنوع
  NOT_FOUND: { code: 404, message: 'Not found' }, // 404: پیدا نشد
  INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal server error' }, // 500: خطای داخلی سرور
};
