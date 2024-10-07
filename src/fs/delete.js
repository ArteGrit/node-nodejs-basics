import { unlink } from 'node:fs';
import { join } from 'node:path';

// delete.js - implement function that deletes file fileToRemove.txt (if there's no file fileToRemove.txt Error with
// message FS operation failed must be thrown)

const remove = async () => {
  const filePath = join(process.cwd(), 'files', 'fileToRemove.txt');

  unlink(filePath, (err) => {
    if (err) {
      throw new Error ('FS operation failed');
    }
  });
};

await remove();