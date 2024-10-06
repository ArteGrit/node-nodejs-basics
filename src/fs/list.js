import { promises as pfs } from 'node:fs';
import { join } from 'node:path';

// list.js - implement function that prints all array of filenames from files folder into console (if files folder
// doesn't exists Error with message FS operation failed must be thrown)

const list = async () => {
  const folderPath = join(process.cwd(), 'files');

  try {
    await pfs.access(folderPath);

    const files = await pfs.readdir(folderPath);

    console.log(files);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await list();