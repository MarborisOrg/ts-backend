import ConnectToMysql from "../databases/mysql/use/index.js";
import "../utils/global/handler.js";

// Init function, on the top
class Initializer {
  static {
    async () => {
      await ConnectToMysql(); // [Mysql] Check database connected
    };
  }
}

export default Initializer;
