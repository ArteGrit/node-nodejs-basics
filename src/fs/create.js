import { promises as pfs, constants } from 'fs';
import path from 'path';

// create.js - implement function that creates new file fresh.txt with content I am fresh and young inside of the files
// folder (if file already exists Error with message FS operation failed must be thrown)

const create = async () => {
  const filePath = path.join(process.cwd(), 'files', 'fresh.txt');
  const fileContent = 'I am fresh and young';

  try {
    // Check if the file already exists
    await pfs.access(filePath, constants.F_OK);
    throw new Error('FS operation failed: File already exists');

  } catch (err) {
    if (err.code === 'ENOENT') {
      // Create file if it doesn't exist
      await pfs.writeFile(filePath, fileContent, 'utf8');
    } else {
      throw err;
    }
  }
};

await create();