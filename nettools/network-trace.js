(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.NetworkTrace = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function create(events) {
    const steps = Array.isArray(events) ? events : [];
    let index = steps.length ? 0 : -1;
    return {
      current: () => index < 0 ? null : steps[index],
      index: () => index,
      total: () => steps.length,
      next: () => { if (index < steps.length - 1) index++; return index; },
      previous: () => { if (index > 0) index--; return index; },
      first: () => { index = steps.length ? 0 : -1; return index; },
      last: () => { index = steps.length - 1; return index; },
      jump: position => {
        if (Number.isInteger(position) && position >= 0 && position < steps.length) index = position;
        return index;
      },
      visible: () => steps.slice(0, index + 1)
    };
  }
  function createPlayer(trace, onStep, timer = globalThis) {
    let handle = null;
    let interval = 650;
    function pause() {
      if (handle !== null) timer.clearInterval(handle);
      handle = null;
    }
    function play(speed = interval) {
      pause();
      if (trace.total() < 2) return false;
      if (trace.index() === trace.total() - 1) { trace.first(); onStep(); }
      interval = speed;
      handle = timer.setInterval(() => {
        trace.next();
        if (trace.index() === trace.total() - 1) pause();
        onStep();
      }, interval);
      return true;
    }
    return {play, pause, isPlaying: () => handle !== null};
  }
  return {create, createPlayer};
});
