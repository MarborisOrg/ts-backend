// Initializer
import ConnectToMysql from "../mysql/use";

class Initializer {
    static async initialize() {
        try {
            await ConnectToMysql(); 
            console.log("Database connected successfully.");
        } catch (error) {
            console.error("Database connection failed:", error);
        }
    }
}

// IIFE
(async () => {
    await Initializer.initialize();
})();

export default Initializer;
