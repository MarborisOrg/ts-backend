
import CREATE_DATABASE_INIT from "./create_database"
import CREATE_TABLE_INIT from "./create_tables"

/**
 * @author MRB
 */
export default async function () {
  try {
    const results = await CREATE_DATABASE_INIT(); // check database
    if (results){
      CREATE_TABLE_INIT(); // check tables
    }else{
      throw new Error('[database] Mysql err!');
    }
  } catch (e: any) {
  }
}
