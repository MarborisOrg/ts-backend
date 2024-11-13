import { Worker } from 'worker_threads';

let hi = 5;

const workerCode = `
  import request from "request";

  request('http://www.google.com', function (error, response, body) {
      console.log(body)
  });
`;

new Worker(workerCode, { eval: true });
