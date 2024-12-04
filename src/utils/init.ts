import { exec } from 'child_process';
import { createInterface } from 'readline';

import { keysDir } from '#core/init/requirements';
import { createBackup } from '#utils/file_backup';

export class Init {
  public async init(): Promise<void> {
    if ($.config.init) {
      try {
        const defaultEnvContent = `
## If you changed this params, restart your app

## Server
PORT=8686

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

# number
apiId=
# hash
apiHash=""
# telegram api bot token
tbot_token=""
# your first login session in MTProto
MTSession=""
`;

        const currentDir = process.cwd();
        const envFilePath = $.path.join(currentDir, '.env');
        const envDevFilePath = $.path.join(currentDir, '.env.dev');

        await new createBackup().renameFileIfExists(envFilePath);
        await new createBackup().renameFileIfExists(envDevFilePath);

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

        await this.initHttps();
      } catch (err) {
        console.error(err);
      } finally {
        process.exit();
      }
    }
  }

  private async initHttps(): Promise<void> {
    const runCommand = (command: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            reject(`Error: ${stderr}`);
          } else {
            resolve(stdout);
          }
        });
      });
    };

    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const question = (query: string): Promise<string> => {
      return new Promise((resolve) => rl.question(query, resolve));
    };

    const askQuestions = async (): Promise<{
      country: string;
      state: string;
      city: string;
      organization: string;
      commonName: string;
    }> => {
      const country = await question('Enter your country (2 letter code): ');
      const state = await question('Enter your state: ');
      const city = await question('Enter your city: ');
      const organization = await question('Enter your organization: ');
      const commonName = await question('Enter your common name (domain): ');

      return { country, state, city, organization, commonName };
    };

    try {
      const { country, state, city, organization, commonName } =
        await askQuestions();

      console.log('Generating private key...');
      await runCommand('openssl genrsa -out private.key 2048');
      console.log('Private key generated.');

      console.log('Generating certificate...');
      const reqCommand = `openssl req -new -x509 -key private.key -out certificate.crt -days 600 -subj "/C=${country}/ST=${state}/L=${city}/O=${organization}/CN=${commonName}"`;
      await runCommand(reqCommand);
      console.log('Certificate generated.');

      await new createBackup().renameFileIfExists(
        $.path.join(keysDir, 'private.key')
      );
      $.fs.renameSync('private.key', $.path.join(keysDir, 'private.key'));
      await new createBackup().renameFileIfExists(
        $.path.join(keysDir, 'certificate.crt')
      );
      $.fs.renameSync(
        'certificate.crt',
        $.path.join(keysDir, 'certificate.crt')
      );

      console.log('Files moved to the keys directory.');
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      rl.close();
    }
  }
}
