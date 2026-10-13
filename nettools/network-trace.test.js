const test = require('node:test');
const assert = require('node:assert/strict');
const {create, createPlayer} = require('./network-trace.js');

test('step controls respect boundaries and reveal events in order', () => {
  const events = [{number: 1}, {number: 2}, {number: 3}];
  const trace = create(events);
  assert.equal(trace.current().number, 1);
  assert.deepEqual(trace.visible(), [events[0]]);
  assert.equal(trace.previous(), 0);
  assert.equal(trace.next(), 1);
  assert.deepEqual(trace.visible(), events.slice(0, 2));
  assert.equal(trace.last(), 2);
  assert.equal(trace.next(), 2);
  assert.equal(trace.first(), 0);
  assert.equal(trace.jump(99), 0);
  assert.equal(trace.jump(2), 2);
  assert.equal(trace.jump(1), 1);
  assert.deepEqual(trace.visible(), events.slice(0, 2));
});

test('empty traces have no current event', () => {
  const trace = create([]);
  assert.equal(trace.current(), null);
  assert.equal(trace.next(), -1);
  assert.equal(trace.last(), -1);
  assert.deepEqual(trace.visible(), []);
});

test('playback advances, pauses at the end, and restarts from first', () => {
  let tick = null;
  let cleared = 0;
  const timer = {setInterval(fn, speed) { tick = fn; assert.equal(speed, 250); return 1; }, clearInterval() { cleared++; tick = null; }};
  const trace = create([{number: 1}, {number: 2}, {number: 3}]);
  const shown = [];
  const player = createPlayer(trace, () => shown.push(trace.current().number), timer);
  assert.equal(player.play(250), true);
  assert.equal(player.isPlaying(), true);
  tick();
  assert.equal(trace.current().number, 2);
  tick();
  assert.equal(trace.current().number, 3);
  assert.equal(player.isPlaying(), false);
  assert.deepEqual(shown, [2, 3]);
  assert.equal(player.play(250), true);
  assert.equal(trace.current().number, 1);
  assert.equal(shown.at(-1), 1);
  player.pause();
  assert.equal(player.isPlaying(), false);
  assert.ok(cleared >= 2);
});
