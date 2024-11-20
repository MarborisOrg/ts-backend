// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// /* eslint-disable functional/immutable-data */
// /* eslint-disable functional/prefer-readonly-type */
// /**
//  * MRB
//  * Dynamic Scaling
//  */

// import { ChildProcess, fork } from 'child_process';
// import os from 'os';
// import { setInterval } from 'timers';

// const numCPUs = os.cpus().length;
// const maxWorkers = numCPUs * 2; // Maximum number of workers
// const minWorkers = numCPUs; // Minimum number of workers
// let currentWorkers = minWorkers;
// const workers: ChildProcess[] = [];

// // Function to get the current CPU load
// const getCPULoad = (): number => {
//   const cpus = os.cpus();
//   const totalIdle = cpus.reduce((acc, cpu) => acc + cpu.times.idle, 0);
//   const totalTick = cpus.reduce((acc, cpu) => acc + Object.values(cpu.times).reduce((a, b) => a + b, 0), 0);
//   return 100 - Math.round((totalIdle / totalTick) * 100);
// };

// // Function to get the current memory usage
// const getMemoryUsage = (): number => {
//   const totalMemory = os.totalmem();
//   const freeMemory = os.freemem();
//   return ((totalMemory - freeMemory) / totalMemory) * 100; // Return memory usage as a percentage
// };

// // Function to start a new worker
// const startWorker = () => {
//   const worker = fork(new URL('../bd/index.js', import.meta.url).pathname); // Replace 'worker.js' with your worker script
//   workers.push(worker);
//   currentWorkers++;
// };

// // Function to get a worker to kill
// const getWorkerToKill = (): ChildProcess | null => {
//   return workers.length > 0 ? workers.pop()! : null; // Use non-null assertion operator
// };

// // Function to scale workers based on load
// const scaleWorkers = () => {
//   console.log("SCALE")
//   const cpuLoad = getCPULoad();
//   const memoryLoad = getMemoryUsage();

//   console.log("CPU: " + cpuLoad)
//   console.log("memory: " + memoryLoad)

//   if ((cpuLoad > 75 || memoryLoad > 75) && currentWorkers < maxWorkers) {
//     console.log(`Scaling up: CPU load is ${cpuLoad}%, Memory load is ${memoryLoad}%. Adding a new worker.`);
//     startWorker();
//   } else if ((cpuLoad < 25 && memoryLoad < 25) && currentWorkers > minWorkers) {
//     console.log(`Scaling down: CPU load is ${cpuLoad}%, Memory load is ${memoryLoad}%. Removing a worker.`);
//     const workerToKill = getWorkerToKill();
//     if (workerToKill) {
//       workerToKill.kill();
//       currentWorkers--;
//     }
//   }
// };

// setInterval(scaleWorkers, 5000); // Check load every 5 seconds
