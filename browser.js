const iPromise = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const doWithTimeout = (fn, ms) => setTimeout(fn, ms);


doWithTimeout(() => console.log("Expired timeout callbackes"), 0);

iPromise(10).then(() => console.log('1.Microtasks (Promise callbacks)'));

iPromise(20).then(() => console.log('2.Microtasks (Promise callbacks)'));

console.log("Current event loop.");
