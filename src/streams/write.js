import { createWriteStream } from 'fs';
import { join } from 'node:path';

// write.js - implement function that writes process.stdin data into file fileToWrite.txt content using Writable Stream

const write = async () => {
  const filePath = join(process.cwd(), 'files', 'fileToWrite.txt');

  const writeStream = createWriteStream(filePath, { encoding: 'utf8' });

  process.stdin.pipe(writeStream);
  process.stdin.resume();
};

// you should run script ---> node stdinExample.js
// Type some text into the terminal
    //To done providing input, use:
// On Linux/macOS: Ctrl+D.
// On Windows: Ctrl+Z followed by Enter.

// Wish I knew this before doing this task 0_0

await write();