import ConnectDatabase from "#modules/c-init";
import "#utils/global/handler";

// Init function, on the top
export default async function init(): Promise<void> {
  try {
    await ConnectDatabase(); // Check databases connected
  } catch (error) {
    console.error("init file error:", error);
    process.exit(1);
  }
}
