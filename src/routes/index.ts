import { loadRoutes } from "./misc/apps-routes.js";
import { Express } from "express";

export default async function(app: Express): Promise<void> {
  console.log('loading..')

  try {
    await loadRoutes(app)
  } catch (error) {
    console.log('error! loading not complete.')
  }

  console.log('loading complete.')

};
