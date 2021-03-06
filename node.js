const fs = require('fs');

const iPromise = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const doImmediately = (fn) => setImmediate(fn);
const doInNextTick = (fn) => process.nextTick(fn);
const doWithTimeout = (fn, ms) => setTimeout(fn, ms);

const doIO = (fn) => fs.readFile("./package.json", fn);
const doIOAsync = (fn) => {
  const buffer = fs.readFileSync("./package.json");
  fn(null, buffer);
};

doIO((_, data) => {
  console.log("IO events (non blocking)");
  // console.log(data.toString());
});
doIOAsync((_, data) => {
  console.log("IO events (blocking)");
  // console.log(data.toString());
});

doImmediately(() => console.log("Immediates queue."));

iPromise(200).then(() => console.log('1.Microtasks (Promise callbacks)'));
iPromise(250).then(() => console.log('2.Microtasks (Promise callbacks)'));

doWithTimeout(() => console.log("Expired timeout callbackes"), 0);

doInNextTick(() => console.log("nextTick queue."));
console.log("Current event loop.");

// Result
/**
 * IO events (blocking)
 * Current event loop.
 * nextTick queue.
 * Expired timeout callbackes
 * Immediates queue.
 * IO events (non blocking)
 * 1.Microtasks (Promise callbacks)
 * 2.Microtasks (Promise callbacks)
 */
