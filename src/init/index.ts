
import ConnectToMysql from "../mysql/use";

// Init function, on the top
class Initializer {
    static {
        async () => {
            await ConnectToMysql(); // [Mysql] Check database connected
        }
    }
}

export default Initializer;
