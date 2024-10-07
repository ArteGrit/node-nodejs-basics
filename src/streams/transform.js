import { Transform } from 'stream';

// transform.js - implement function that reads data from process.stdin, reverses text using Transform Stream and then
// writes it into process.stdout

const createReverseTransformStream = () => {
  return new Transform({
    transform(chunk, encoding, callback) {
      // Short solution
      // const reversed = chunk.toString().split('').reverse().join('');
      // callback(null, reversed);

      // With error handling
      let data;
      try {
        data = chunk.toString().split('').reverse().join('');
      } catch (err) {
        return callback(err);
      }
      this.push(data);
      callback();
    }
  });
};

const transform = async () => {
  const reverseTransform = createReverseTransformStream();

  process.stdin
    .pipe(reverseTransform)
    .pipe(process.stdout);

  process.stdin.resume();
};

// you should run script ---> node transform.js
// type some text into the terminal and press return/enter
// ctrl+C to stop

await transform();