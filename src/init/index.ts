
import ConnectToMysql from "../mysql/database/init";

// Init function, on the top
(function () {
    try {
        ConnectToMysql(); // Check database connected
    } catch (e: any) {
    }
})();