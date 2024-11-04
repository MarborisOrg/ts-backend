namespace config {
    export interface Settings {
        PORT: number;
        sv: string;
        user: string;
        password: string;
        database: string;
        multipleStatements: boolean;
        SECRET_KEY: string;
        admin_user: string;
        admin_pass: string;
        scriptSrc: string;
    }
}
