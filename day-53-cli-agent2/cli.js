#!/usr/bin/env node
import main from "./src/main.js"

const lightBlue = '\x1b[94m';
const reset = '\x1b[0m';
console.log(`${lightBlue}
  /\\_/\\  
 ( o.o )  WELCOME TO CATCODE!
  > ^ <
${reset}`);

main()