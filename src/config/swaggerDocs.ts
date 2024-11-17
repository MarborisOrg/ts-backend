import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export default function (app: Express, port: string) {
  const options = {
    swaggerDefinition: {
      swagger: "2.0", // api version (changed to 2.0)
      info: {
        title: "Book project",
        description:
          "API endpoints for a mini book services documented on swagger",
        contact: {
          name: "MRB",
          email: "mehrabshafae@gmail.com",
          url: "https://github.com/S-MRB-S",
        },
        version: "4.0.0", // app version (can change this)
      },
      host: `127.0.0.1:${port}`, // host
      basePath: "/", // base path
      schemes: ["http"], // supported schemes
    },
    apis: ["**/*.ts"], // ts files over .js file in dist
  };

  const swaggerSpec = swaggerJsdoc(options);
  (function () {
    // Swagger Page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Documentation in JSON format
    app.get("/docs.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
  })();
}
