// execute functions in chain
const execAll = (...funcs: Array<Function>) => (...args: any) =>
  funcs.forEach(fn => fn && fn(...args))

export { execAll }
