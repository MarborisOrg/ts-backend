import { Express, Router } from "express";
import fs from "fs";
import path from "path";

export const loadRoutes = async (app: Express): Promise<void> => {
  const routesDir = path.join(process.cwd(), "..", "apps");

  const latestFolderPath = path.join(routesDir, "latest");
  if (
    fs.existsSync(latestFolderPath) &&
    fs.statSync(latestFolderPath).isDirectory()
  ) {
    try {
      const usersRoutePath = path.join(latestFolderPath, DEF_ROUTE_FILE);

      if (fs.existsSync(usersRoutePath)) {
        const { default: router }: { default: Router } = await import(
          usersRoutePath
        );
        app.use("/", router);
      }
    } catch (error) {
      console.error("[latest route loader] This is an unrecoverable error!");
      process.exit(1);
    }
  }

  fs.readdir(routesDir, async (err, folders) => {
    if (err) {
      console.error("Error reading routes directory:", err);
      return;
    }

    for (const folder of folders) {
      if (folder === "latest") continue;

      try {
        const folderPath = path.join(routesDir, folder);
        if (fs.statSync(folderPath).isDirectory()) {
          const usersRoutePath = path.join(folderPath, DEF_ROUTE_FILE);

          if (fs.existsSync(usersRoutePath)) {
            const { default: router }: { default: Router } = await import(
              usersRoutePath
            );
            app.use(`/${folder}`, router);
          }
        }
      } catch (error) {
        console.error("[route loader] This is an unrecoverable error!");
        continue;
      }
    }
  });
};
