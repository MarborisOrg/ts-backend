
import CREATE_DATABASE_INIT from "./create_database"
import CREATE_TABLE_INIT from "./create_tables"

export default function () {
  try {
    CREATE_DATABASE_INIT(); // check database
    CREATE_TABLE_INIT(); // check tables
  } catch (e: any) {
  }
}
