'use strict'
import dataCore from './data_core'

class Game {
  /** Responsible for making calls to methods that will parse log game
   * @param {void}
   * @param {void}
   * @return {void}
   */
  handle() {
    this.newGame()
  }

  /** Add 1 to currentGame counter
   *  @param {void}
   * @return {integer} currentGame number
   */
  newGame() {
    try {
      return dataCore.currentGame++
    } catch (err) {
      throw new Error(err)
    }
  }

  /** Get the currentGame number
   * @param {void}
   * @return {integer} currentGame The number of current game
   */
  getCurrentGame() {
    try {
      return dataCore.currentGame
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new Game()
