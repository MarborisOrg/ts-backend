class ErrorHandler {
    private static instance: ErrorHandler;

    private constructor() {}

    public static getInstance(): ErrorHandler {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler();
        }
        return ErrorHandler.instance;
    }

    public logError(error: Error): void {
        console.error("خطا:", error.message);
    }

    public handleError(error: Error): void {
        this.logError(error);
    }

    public wrapFunction<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => ReturnType<T> | void {
        return (...args: Parameters<T>): ReturnType<T> | void => {
            try {
                return fn(...args);
            } catch (error) {
                if (error instanceof Error) {
                    this.handleError(error);
                } else {
                    this.handleError(new Error("یک خطا ناشناخته رخ داد!"));
                }
            }
        };
    }
}

const errorHandler = ErrorHandler.getInstance();

const createSafeFunction = <T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => ReturnType<T> | void => {
    return errorHandler.wrapFunction(fn);
};

// const riskyFunction = createSafeFunction(() => {
//     throw new Error("err hapen");
// });

// riskyFunction();

// createSafeFunction(function() {
//     throw new Error("err hapen2");
// });

console.log("h");
