
import ConnectToMysql from "../mysql/use";

// Init function, on the top
(function () {
    try {
        ConnectToMysql(); // [Mysql] Check database connected
    } catch (e: any) {
    }
})();