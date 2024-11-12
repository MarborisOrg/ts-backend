import { config } from "#config/env_get";
import booksRouter from "#routes/index";
import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import "#init/index"; // init
import { helmetConfig } from "#config/helment";
// import { ipv6Blocker } from "#middleware/ipv6Blocker";

export function expressApp() {
  // app (express)
  const app = express();
  
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Book Project',
        version: '4.0.0',
        description: 'Book saver/getter project',
      },
    },
    apis: ['./routes/*/*.js'],
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  // ipv6Blocker(app); // IPv6 Blocker

  app.use(helmetConfig()); // helment helper
  app.use(express.json()); // json

  app.use(express.urlencoded({ extended: true })); // options
  // app.use("/", booksRouter); // book router
  booksRouter(app);

  app.listen(config.PORT, () => {
    console.log("Server connected, port: " + config.PORT);
  });
}
