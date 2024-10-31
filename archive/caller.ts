// import path from 'path';

// export const getCallerInfo = (): string => {
//     const err = new Error();
//     const stack = err.stack?.split('\n');
//     if (stack && stack.length > 2) {
//         // در اینجا به خط سوم استک (index 2) نگاه می‌کنیم
//         const callerLine = stack[2].trim(); 
//         // الگوی جدید برای تطبیق نام فایل
//         const match = callerLine.match(/at (.+) $(.+):\d+:\d+$/) || callerLine.match(/at (.+):\d+:\d+/);
//         if (match) {
//             const fullPath = match[2] || match[1]; // استفاده از match[2] یا match[1] بسته به الگو
//             return path.basename(fullPath, path.extname(fullPath)); 
//         }
//     }
//     return 'unknown';
// };
