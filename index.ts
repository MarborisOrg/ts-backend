
// Router project, by MRB

// imports
import express from "express";
import ConnectToMysql from "./mysql/init";
import { PORT } from "./defconsts";


// Init function, on the top
(function() {
  try {
    ConnectToMysql(); // Check database connected
  }catch(e: any){
  }
})();

// app (express)
const app = express()

// routers
app.get('/root', function (req: any, res: any) {

  const type: string = req.query.type;
  const status: string = req.query.status;

  if (type == "admin" && status == "saving"){
    res.send('[admin] Saving...')
    // book
    const title: string = req.query.title; // title
    const description: string = req.query.description; // description

  }

  if (type == "admin" && status == "getting"){
    res.send('[admin] Saving...')

  }

})

// port
console.log("Server trying to connect port: " + PORT)
app.listen(PORT)


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
