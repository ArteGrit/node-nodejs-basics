import { parentPort, isMainThread } from 'worker_threads';

// worker.js - extend given function to work with data received from main thread and implement function which sends
// result of the computation to the main thread

// Function to calculate the nth Fibonacci number
const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

// n should be received from main thread
const sendResult = (n) => {
  parentPort.postMessage({ status: 'resolved', data: n });
};

const sendToMainThread = () => {
  if (!isMainThread) {
    parentPort.on('message', (n) => {
      try {
        const result = nthFibonacci(n);
        sendResult(result);
      } catch (error) {
        parentPort.postMessage({ status: 'error', data: null });
      }
    });
  }
};

sendToMainThread();