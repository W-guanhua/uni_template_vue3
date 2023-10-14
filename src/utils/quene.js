class Queue {
  dataStore = []

  constructor () {
      this.dataStore = []
  }

  // 添加任务
  enqueue (e) {
      this.dataStore.push(e)
  }

  // 置顶任务
  stickqueue (e) {
      this.dataStore.unshift(e)
  }

  // 删除任务
  dequeue () {
      this.dataStore.shift()
  }

  get firstTask () {
      return this.dataStore[0]
  }

  get lastTask () {
      return this.dataStore[this.dataStore.length - 1]
  }

  get isEmpty () {
      if (this.dataStore.length === 0) {
          return true
      }
      return false
  }
}

export default Queue
