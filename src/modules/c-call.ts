// تعریف نوع برای هر تابع
type NamedFunction = {
    name: string;
    func: () => void;
};

// تعریف نوع برای هر ردیف
type Row = {
    name: string;
    functions: NamedFunction[];
    called: boolean; // برای پیگیری اینکه آیا ردیف صدا زده شده است یا نه
};

// ایجاد آرایه اصلی
const mainArray: Row[] = [
    {
        name: "Row 1",
        functions: [
            { name: "Function 1", func: () => console.log("Function 1 from Row 1") },
            { name: "Function 2", func: () => console.log("Function 2 from Row 1") },
        ],
        called: false,
    },
    {
        name: "Row 2",
        functions: [
            { name: "Function 1", func: () => console.log("Function 1 from Row 2") },
            { name: "Function 2", func: () => console.log("Function 2 from Row 2") },
        ],
        called: false,
    },
];

// تابع برای صدا زدن یک تابع خاص از ردیف بر اساس نام
function callFunctionByName(rowName: string, functionName: string) {
    const row = mainArray.find(r => r.name === rowName);

    if (!row) {
        console.log("Row not found");
        return;
    }

    // بررسی اینکه آیا ردیف قبلاً صدا زده شده است یا نه
    if (!row.called) {
        const namedFunction = row.functions.find(f => f.name === functionName);

        if (namedFunction) {
            console.log(`Calling ${namedFunction.name} from ${row.name}:`);
            namedFunction.func(); // اجرای تابع انتخاب شده
        } else {
            console.log(`Function ${functionName} not found in ${row.name}.`);
        }

        row.called = true; // علامت‌گذاری ردیف به عنوان صدا زده شده
    } else {
        console.log(`${row.name} has already been called.`);
    }
}

// استفاده از تابع
callFunctionByName("Row 1", "Function 1"); // صدا زدن "Function 1" از "Row 1"
callFunctionByName("Row 1", "Function 2"); // تلاش برای صدا زدن "Function 2" از "Row 1"
callFunctionByName("Row 2", "Function 1"); // صدا زدن "Function 1" از "Row 2"
callFunctionByName("Row 1", "Function 1"); // تلاش برای صدا زدن دوباره "Function 1" از "Row 1"
