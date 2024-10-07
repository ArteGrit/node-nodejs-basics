import { fork } from 'child_process';
import { join } from "path";

/*
cp.js - implement function spawnChildProcess that receives array of arguments args and creates child process from file
script.js, passing these args to it. This function should create IPC-channel between stdin and stdout of master process
 and child process:
child process stdin should receive input from master process stdin
child process stdout should send data to master process stdout
 */

const spawnChildProcess = async (args) => {
  const filePath = join(process.cwd(), 'files', 'script.js');

  const child = fork(filePath, args, {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'] // https://nodejs.org/api/child_process.html#optionsstdio https://nodejs.org/api/child_process.html#child_processforkmodulepath-args-options
  });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess( ['someArgument1', 'someArgument2']);
