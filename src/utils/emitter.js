import EventEmitter from 'events';

const _emitter = new EventEmitter();

_emitter.setMaxListeners(0);
// ko gioi han so ng nghe
export const emitter = _emitter;