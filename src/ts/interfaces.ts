export namespace config_ns {
    export interface Settings {
        PORT: number;
        mysql_sv: string;
        mysql_user: string;
        mysql_password: string;
        database_name: string;
        mysql_multipleStatements: boolean;
        SECRET_KEY: string;
        admin_user: string;
        admin_pass: string;
        scriptSrc: string;
        mongo_url: string;
        tc_book_name: string;
    }
}
