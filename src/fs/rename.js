import { rename as fsRename, access, constants } from 'node:fs';
import { join } from 'path';

// rename.js - implement function that renames file wrongFilename.txt to properFilename with extension .md (if there's
// no file wrongFilename.txt or
// properFilename.md already exists Error with message FS operation failed must be thrown)

const ERROR_TEXT = 'FS operation failed';

const rename = async () => {
  const wrongFilename = join(process.cwd(), 'files', 'wrongFilename.txt');
  const properFilename = join(process.cwd(), 'files', 'properFilename.md');

  access(wrongFilename, constants.F_OK, (err) => {
    if (err) {
      throw new Error(`${ERROR_TEXT}: ${err.message}`);
    }

    access(properFilename, constants.F_OK, (err) => {
      if (!err) {
        throw new Error(`${ERROR_TEXT}: properFilename.md already exists`);
      }

      fsRename(wrongFilename, properFilename, (err) => {
        if (err) {
          throw new Error(`${ERROR_TEXT}: ${err.message}`);
        }
      });
    });
  });
};

await rename();