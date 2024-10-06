import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { join } from "node:path";
import { pipeline } from 'stream';

// calcHash.js - implement function that calculates SHA256 hash for file fileToCalculateHashFor.txt and logs it into
// console as hex using Streams API

const calculateHash = async () => {
  const filePath = join(process.cwd(), 'files', 'fileToCalculateHashFor.txt');
  const hash = createHash('sha256');
  const inputStream = createReadStream(filePath);

  pipeline(
    inputStream,
    hash,
    (err) => {
      if (!err) {
        console.log(`SHA256 hex hash: ${hash.digest('hex')}`);
      }
    }
  );
};

await calculateHash();