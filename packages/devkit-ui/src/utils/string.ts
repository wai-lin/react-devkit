Object.defineProperty(String.prototype, 'isEqual', {
  value(compare: string) {
    return this.toString() === compare
  },
})

export {}
