import ConnectToMysql from "#databases/mysql/use/index";
import "#utils/global/handler";

// Init function, on the top
class Initializer {
  static {
    async () => {
      await ConnectToMysql(); // [Mysql] Check database connected
    };
  }
}

export default Initializer;
