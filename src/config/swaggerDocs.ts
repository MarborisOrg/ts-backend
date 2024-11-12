import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export default function (app: Express, port: string) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Book project",
        description:
          "API endpoints for a mini book services documented on swagger",
        contact: {
          name: "MRB",
          email: "mehrabshafae@gmail.com",
          url: "https://github.com/S-MRB-S",
        },
        version: "4.0.0",
      },
      servers: [
        {
          url: "http://localhost:" + port + "/",
          description: "Local server",
        },
        //   {
        //     url: "<your live url here>",
        //     description: "Live server",
        //   },
      ],
    },
    // looks for configuration in specified directories
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
