import mitt from 'mitt'

const emitter = {}

export function setup() {
  const _emitter = mitt()

  emitter.$on = _emitter.on
  emitter.$off = _emitter.off
  emitter.$emit = _emitter.emit
}

export default emitter
