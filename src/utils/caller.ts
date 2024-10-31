import path from 'path'; 

export const getCallerInfo = (): string => {
    const err = new Error();
    const stack = err.stack?.split('\n');
    if (stack && stack.length > 2) {
        const callerLine = stack[2]; 
        const match = callerLine.match(/$(.*):\d+:\d+$/);
        if (match) {
            const fullPath = match[1]; 
            return path.basename(fullPath, path.extname(fullPath)); 
        }
    }
    return 'unknown';
};