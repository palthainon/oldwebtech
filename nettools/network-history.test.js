const test = require('node:test');
const assert = require('node:assert/strict');
const {create} = require('./network-history.js');

test('undo and redo track changes and discard an abandoned redo branch', () => {
  const history = create('initial');
  assert.equal(history.record('one'), true);
  assert.equal(history.record('one'), false);
  assert.equal(history.record('two'), true);
  assert.equal(history.undo(), 'one');
  assert.equal(history.record('three'), true);
  assert.equal(history.canRedo(), false);
  assert.equal(history.undo(), 'one');
  assert.equal(history.undo(), 'initial');
  assert.equal(history.undo(), null);
  assert.equal(history.redo(), 'one');
});

test('history keeps a bounded number of changes', () => {
  const history = create('initial', 2);
  history.record('one'); history.record('two'); history.record('three');
  assert.equal(history.undo(), 'two');
  assert.equal(history.undo(), 'one');
  assert.equal(history.undo(), null);
});
