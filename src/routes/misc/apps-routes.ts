import { Express } from 'express';

import { DEF_PATH_ROUTES, DEF_ROUTE_FILE } from './default.js';
import { loadRouter } from './loadRouter.js';

export const loadRoutes = async (
  app: Express,
  routes: readonly string[],
): Promise<void> => {
  for (const routersName of routes) {
    let pathRoute = `/${routersName}`;

    if (routersName === 'latest') {
      pathRoute = '/';
    }

    try {
      await loadRouter(
        app,
        DEF_PATH_ROUTES + `/${routersName}/` + DEF_ROUTE_FILE,
        pathRoute,
      );
    } catch (error) {
      log.error('[route loader] This is an unrecoverable error!');
    }
  }
};
