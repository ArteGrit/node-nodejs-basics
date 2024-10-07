
// args.js - implement function that parses command line arguments (given in format --propName value --prop2Name value2,
// you don't need to validate it) and prints them to the console in the format propName is value, prop2Name is value2

const parseArgs = () => {
  const mark = '--';
  const args = process.argv;

  if (args) {
    const formatArgsStr = args.reduce((str, prop, index, self) => {
      if (prop.startsWith(mark)) {
        const formattedValue = `${prop.replace('--', '')} is ${self[index + 1]}`;

        str = str ? `${str}, ${formattedValue}` : `${formattedValue}`;
      }
      return str;
    }, '');

    console.log(formatArgsStr);
  }
};

parseArgs();