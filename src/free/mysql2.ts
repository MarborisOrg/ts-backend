import { mysqlConnection } from "#databases/mysql/index";

export function freeMysql() {
  mysqlConnection.end();
}
