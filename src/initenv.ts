export class InitEnv {
  public constructor() {
    this.init();
  }
  private init(): void {
    if ($.config.init) {
      try {
        const defaultEnvContent = `
## If you changed this params, restart your app

## Server
PORT=8585

## Mysql
mysql_sv="localhost"
mysql_user="root"
mysql_password=""
mysql_multipleStatements=false

#Mongodb
mongo_url="mongodb://localhost:27017/example"

database_use="mysql" ## mongo/mysql

## auth
SECRET_KEY="Aa123456789"

## admin auth
admin_user="admin"
admin_pass="password"

## security
scriptSrc="https://forvest.io"

## [book] table/collection name
tc_book_name="books"

## Mysql/Mongo database name
database_name="mrb"

## Allowed Ips ( Just number address (no domain support yet))
ALLOWED_IPS=127.0.0.1,localhost
`;

        const currentDir = process.cwd();
        const envFilePath = $.path.join(currentDir, '.env');
        const envDevFilePath = $.path.join(currentDir, '.env.dev');

        if (!$.fs.existsSync(envFilePath)) {
          $.fs.writeFileSync(envFilePath, defaultEnvContent.trim());
          console.log('.env file created successfully.');
        } else {
          console.log('.env file already exists. Skipping creation.');
        }

        if (!$.fs.existsSync(envDevFilePath)) {
          $.fs.writeFileSync(envDevFilePath, defaultEnvContent.trim());
          console.log('.env.dev file created successfully.');
        } else {
          console.log('.env.dev file already exists. Skipping creation.');
        }
      } catch (err) {
        console.error(err);
      } finally {
        process.exit();
      }
    }
  }
}
