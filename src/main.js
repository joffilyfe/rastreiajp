import Tracker from './core/tracker.js';

let tracker = (options) => {
  return new Tracker(options);
};

export {
  tracker as Tracker
};

