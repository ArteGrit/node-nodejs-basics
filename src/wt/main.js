import { Worker } from 'worker_threads';
import { cpus } from 'os';

// main.js - implement function that creates number of worker threads (equal to the number of host machine logical
// CPU cores) from file worker.js and able to send data to those threads and to receive result of the computation from
// them. You should send incremental number starting from 10 to each worker. For example: on host machine with 4 cores
// you should create 4 workers and send 10 to first worker, 11 to second worker, 12 to third worker, 13 to fourth
// worker. After all workers will finish, function should log array of results into console. The results are array of
// objects with 2 properties:
// status - 'resolved' in case of successfully received value from worker or 'error' in case of error in worker
// data - value from worker in case of success or null in case of error in worker

const performCalculations = async () => {
  const workersCount = cpus().length;
  const results = [];
  const numbersToCalculateArr = Array.from(
    { length: workersCount },
    (_, i) => i + 10
  );

  numbersToCalculateArr.forEach((num, index) => {
    const worker = new Worker('./worker.js');

    worker.postMessage(num);
    console.log('num:', num);

    worker.on('message', (msg) => {
      results[index] = msg;
      if (results.length === workersCount) {
        console.log('Results:', results);
      }
    });

    worker.on('error', () => {
      results[index] = { status: 'error', data: null };
      if (results.length === workersCount) {
        console.log('Results:', results);
      }
    });
  });
};

await performCalculations();