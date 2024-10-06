
// read.js - implement function that prints content of the fileToRead.txt into console (if there's no file
// fileToRead.txt Error with message FS operation failed must be thrown)

import { join } from "node:path";
import { promises as pfs } from "node:fs";

const read = async () => {
  const filePath = join(process.cwd(), 'files', 'fileToRead.txt');

  try {
    await pfs.access(filePath);

    const fileContent = await pfs.readFile(filePath, { encoding: 'utf8' });

    console.log(fileContent);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await read();