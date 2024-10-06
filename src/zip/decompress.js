
// decompress.js - implement function that decompresses archive.gz back to the fileToCompress.txt with same content as
// before compression using zlib and Streams API

import { access, constants } from 'node:fs';
import { join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';

const decompress = async () => {
  const archive = join(process.cwd(), 'files', 'archive.gz');

  access(archive, constants.F_OK, (err) => {
    if (err) {
      throw new Error('File does not exist');
    }
    const input = createReadStream(archive);
    const output = createWriteStream(join(process.cwd(), 'files', 'fileToCompress_.txt'));
    const unzip = createGunzip();

    input.pipe(unzip).pipe(output);
  });
};

await decompress();