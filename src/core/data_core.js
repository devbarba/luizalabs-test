'use strict'
class Data {
  constructor() {
    this.parsedLines = [
      {
        commandType: '',
        lineValue: ''
      }
    ]
  }

  /** Generic function that inserts into data arrays
   *
   * @param {array} array Destination array
   * @param {array} data Array source
   */
  pushToArray(array, data) {
    try {
      array.push(data)
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new Data()
