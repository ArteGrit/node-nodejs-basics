import { promises as pfs, constants } from 'fs';
import path from 'path';

// copy.js - implement function that copies folder files with all its content into folder files_copy at the same
// level (if files folder doesn't exists or files_copy has already been created Error with message FS operation failed must be thrown)

const copy = async () => {
  const sourceDir = path.join(process.cwd(), 'files');
  const destDir = path.join(process.cwd(), 'files_copy');

  try {
    // Check if the source folder exists
    await pfs.access(sourceDir, constants.F_OK);

    try {
      await pfs.access(destDir, constants.F_OK);
      throw new Error('FS operation failed: Destination folder already exists');
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    async function copyContent(src, dest) {
      const entries = await pfs.readdir(src, { withFileTypes: true });

      await pfs.mkdir(dest);

      for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
          await copyContent(srcPath, destPath); // Recursively copy folders
        } else {
          await pfs.copyFile(srcPath, destPath);
        }
      }
    }

    await copyContent(sourceDir, destDir);

  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed: Source folder does not exist');
    } else {
      throw err;
    }
  }
};

await copy();
