import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { join } from "node:path";

// compress.js - implement function that compresses file fileToCompress.txt to archive.gz using zlib and Streams API

const compress = async () => {
  const filePath = join(process.cwd(), 'files', 'fileToCompress.txt');

  const source = createReadStream(filePath);
  const result = createWriteStream('archive.gz');
  const archive = createGzip();

  source.pipe(archive).pipe(result);
};

await compress();