const fs = require('fs');

const iPromise = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const doImmediately = (fn) => setImmediate(fn);
const doInNextTick = (fn) => process.nextTick(fn);
const doWithTimeout = (fn, ms) => setTimeout(fn, ms);

const doIO = (fn) => fs.readFile("./package.json", fn);

doIO((_, data) => {
  console.log("IO events");
  console.log(data.toString());
});
doImmediately(() => console.log("Immediates queue."));

iPromise(200).then(() => console.log('1.Microtasks (Promise callbacks)'));
iPromise(250).then(() => console.log('2.Microtasks (Promise callbacks)'));

doWithTimeout(() => console.log("Expired timeout callbackes"), 0);

doInNextTick(() => console.log("nextTick queue."));
console.log("Current event loop.");
