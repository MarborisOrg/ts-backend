import ConnectDatabase from "#modules/c-init";
import "#utils/global/handler";

// Init function, on the top
class Initializer {
  static {
    async () => {
      await ConnectDatabase(); // Check databases connected
    };
  }
}

export default Initializer;
