
import ConnectToMysql from "../mysql/use";

// Init function, on the top
(function () {
    try {
        ConnectToMysql(); // Check database connected
    } catch (e: any) {
    }
})();