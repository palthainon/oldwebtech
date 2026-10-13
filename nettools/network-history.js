(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.NetworkHistory = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function create(initial, limit = 50) {
    let entries = [initial];
    let index = 0;
    return {
      record(snapshot) {
        if (snapshot === entries[index]) return false;
        entries = entries.slice(0, index + 1);
        entries.push(snapshot);
        if (entries.length > limit + 1) entries.shift();
        index = entries.length - 1;
        return true;
      },
      undo() { return index > 0 ? entries[--index] : null; },
      redo() { return index < entries.length - 1 ? entries[++index] : null; },
      canUndo() { return index > 0; },
      canRedo() { return index < entries.length - 1; }
    };
  }
  return {create};
});
