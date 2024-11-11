import { Express } from "express";
import { loadRouter } from "./loadRouter.js";
import { DEF_PATH_ROUTES, DEF_ROUTE_FILE } from "./default.js";

export const loadRoutes = async (
  app: Express,
  routes: string[]
): Promise<void> => {
  routes.forEach(async (routersName) => {
    let pathRoute = `/${routersName}`;

    if (routersName === "latest") {
      pathRoute = "/";
    }

    try {
      await loadRouter(
        app,
        DEF_PATH_ROUTES + `/${routersName}/` + DEF_ROUTE_FILE,
        pathRoute
      );
    } catch (error) {
      console.error("[route loader] This is an unrecoverable error!");
    }
  });
};
