import { Express } from 'express';

import { DEF_PATH_ROUTES, DEF_ROUTE_FILE } from '../../config/default.js';

import { loadRouter } from './loadRouter.js';

export const loadRoutes = async (
  app: Express,
  routes: readonly string[]
): Promise<void> => {
  await Promise.all(
    routes.map(async (routersName) => {
      let pathRoute = `/${routersName}`;

      if (routersName === 'latest') {
        pathRoute = '/';
      }

      try {
        await loadRouter(
          app,
          DEF_PATH_ROUTES + `/${routersName}/` + DEF_ROUTE_FILE,
          pathRoute
        );
      } catch (_) {
        log.error('[route loader] This is an unrecoverable error!');
      }
    })
  );
};
