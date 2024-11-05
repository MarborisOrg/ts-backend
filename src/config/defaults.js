class EnvConfig {
    constructor() {
        this.PORT = 8080;
        this.mysql_sv = 'localhost';
        this.mysql_user = 'root';
        this.mysql_password = '';
        this.database_name = 'sp';
        this.mysql_multipleStatements = false;
        this.mongo_url = 'mongodb://localhost:27017/';
        this.tc_book_name = 'tc';
    }
}

class Config {
    constructor() {
        this.env = new EnvConfig();
    }

    getEnv() {
        return this.env;
    }
}

export default new Config();
