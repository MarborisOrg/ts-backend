import { Express } from "express";
import fs from "fs";
import path from "path";
import { loadRouter } from "./loadRouter.js";
import { DEF_ROUTE_FILE } from "./default.js";

export const loadRoutes = async (app: Express): Promise<void> => {
  const routesDir = path.join(process.cwd(), "..", "apps");

  const latestFolderPath = path.join(routesDir, "latest");
  if (fs.existsSync(latestFolderPath) && fs.statSync(latestFolderPath).isDirectory()) {
    const usersRoutePath = path.join(latestFolderPath, DEF_ROUTE_FILE);
    if (fs.existsSync(usersRoutePath)) {
      await loadRouter(app, usersRoutePath, "/");
    }
  }else{
    console.error("[latest route loader] This is an unrecoverable error!");
    process.exit(1);
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
            await loadRouter(app, usersRoutePath, `/${folder}`);
          }
        }
      } catch (error) {
        console.error("[route loader] This is an unrecoverable error!");
        continue;
      }
    }
  });
};
