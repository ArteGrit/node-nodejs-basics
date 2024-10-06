import { createReadStream } from 'fs';
import { join } from "node:path";

// read.js - implement function that reads file fileToRead.txt content using Readable Stream and prints it's content
// into process.stdout

const read = async () => {
  const filePath = join(process.cwd(), 'files', 'fileToRead.txt');

  const stream = createReadStream(filePath);
  stream.pipe(process.stdout);
};

await read();