/**
 * Runs an action recursively
 *
 * Usage:
 *   let integer = 0;
 *   const runner = LongPollingRunner(1, () => {
 *     integer += 1;
 *     return integer === 10;
 *   }));
 *   runner.start();
 *
 * @param {function} action returns boolean, true if long polling should continue, false otherwise.
 * @param {number} interval time in milliseconds
 */
const LongPollingRunner = (action, interval) => new Promise((resolve) => {
  const call = function () {
    setTimeout(() => {
      if (action()) {
        call();
      } else {
        resolve();
      }
    }, interval);
  }
  call();
});

module.exports = LongPollingRunner;
