let id = 0

function uuid() {
  id += 1
  return 'uuid' + id
}

export { uuid as default }
