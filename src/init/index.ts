
import ConnectToMysql from "../mysql/use";
import '../utils/global/handler'

// Init function, on the top
class Initializer {
    static {
        async () => {
            await ConnectToMysql(); // [Mysql] Check database connected
        }
    }
}

export default Initializer;
