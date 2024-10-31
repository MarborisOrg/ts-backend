
// Router project, by MRB

// imports

// load global utils module:
import "./utils/log"

import express from "express";
import ConnectToMysql from "./database/init/init";
import { config } from "./config/get";
import booksRouter from "./routers/books";

// Init function, on the top
(function() {
  try {
    ConnectToMysql(); // Check database connected

    echo("main", "s");
  }catch(e: any){
  }
})();

// app (express)
const app = express()

app.use(express.json());

app.use('/book', booksRouter);

app.listen(config.PORT, () => {
  console.log("Server trying to connect port: " + config.PORT)
});


// Websocket

// import WebSocket from 'ws';
// import http from 'http';
// import path from 'path';

// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws: WebSocket) => {
//   console.log('establish websocket connection');
//   ws.on('message', (message) => {
//     console.log('received: %s', message);
//   });
// });

// app.get('/client/:title', (req, res) => {
//   res.sendFile(path.resolve(__dirname, `./public/client-${req.params.id}.html`));
// });

// app.get('/external-api', (req, res) => {
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       // client.send(faker.internet.email());
//     }
//   });
//   res.sendStatus(200);
// });

// server.listen(PORT, () => console.log(`http server is listening on http://localhost:${PORT}`));

