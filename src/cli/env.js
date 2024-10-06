
// env.js - implement function that parses environment variables with prefix RSS_ and prints them to the console in the
// format RSS_name1=value1; RSS_name2=value2

const parseEnv = () => {
  const prefix = 'RSS_';
  const env = process.env;

  if (env) {
    const formatEnvString = Object.entries(env).reduce((str, [key, value]) => {
      const formattedValue = key.startsWith(prefix) ? `${key}=${value}` : `${prefix}${key}=${value}`;
        if (value) {
          str = str ? `${str}; ${formattedValue}` : `${formattedValue}`;
        }
      return str;
    }, '');

    console.log(formatEnvString);
  }
};

parseEnv();