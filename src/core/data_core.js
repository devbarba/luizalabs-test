'use strict'
class Data {
  constructor() {
    this.currentGame = 0
    this.totalKills = []
    this.games = []
    this.players = []
    this.parsedLines = []
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
