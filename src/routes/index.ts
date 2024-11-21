import { Express } from 'express';

import { AllApps } from './apps/a.js';
import { loadRoutes } from './modules/misc/apps-routes.js';

export default async function (app: Express): Promise<void> {
  try {
    await loadRoutes(app, AllApps);
  } catch (error) {
    log.info('error! loading not complete.');
  }
}
