import ConnectDatabase from "#modules/c-init";
import "#utils/global/handler";

// Init function, on the top
export default async function init(): Promise<void> {
  await ConnectDatabase(); // Check databases connected
}
