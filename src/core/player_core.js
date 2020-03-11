'use strict'
import constants from '../config/constants'
import dataCore from '../core/data_core'
import gameCore from '../core/game_core'

class Player {
  /** Responsible for making calls to methods that will parse log player
   * @param {string} lineValue Value contained in the log file line
   * @return {void}
   */
  handle(lineValue) {
    this.createOrUpdatePlayer(lineValue, constants.game.regex_player_id)
  }

  /**
   *
   * @param {string} lineValue The line value to parse
   * @param {regExp} regex regex retrieve player id
   * @return {void}
   */
  createOrUpdatePlayer(lineValue, regex) {
    try {
      const playerId = lineValue.match(regex)[1]
      const playerName = lineValue.match(regex)[2]
      const game = gameCore.getCurrentGame()

      let player = dataCore.players.find(
        h => h.game === game && h.playerId === playerId
      )
      if (player) {
        Object.assign(player, { playerName })
      } else {
        dataCore.players.push({ game, playerId, playerName })
      }
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new Player()
