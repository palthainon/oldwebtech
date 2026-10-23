import {isProfile} from './profiles.js';
import {scan} from './scanner.js';
import {replace, manualSpans} from './replacements.js';
import {LIMIT} from './types.js';
let key = crypto.getRandomValues(new Uint8Array(32));
self.onmessage = async ({data}) => {
  try {
    if (typeof data.source !== 'string' || new TextEncoder().encode(data.source).length > LIMIT)
      throw new Error('Choose a configuration no larger than 5 MiB.');
    if (!isProfile(data.profile)) throw new Error('Choose a device profile.');
    if (!['labels', 'addresses'].includes(data.mode)) throw new Error('Choose an address mode.');
    if (data.resetKey) key = crypto.getRandomValues(new Uint8Array(32));
    const result = await replace(data.source, scan(data.source, data.profile), manualSpans(data.source, data.selections),
      {addressMode:data.mode, key});
    self.postMessage({id:data.id, result});
  } catch {
    self.postMessage({id:data.id, error:'The scan failed. Clear the page, then try a smaller configuration.'});
  }
};
self.postMessage({ready:true});
