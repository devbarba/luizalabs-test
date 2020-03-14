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
    this.createOrUpdatePlayer(
      lineValue,
      gameCore.getCurrentGame(),
      dataCore.players,
      constants.game.regex_player_id
    )
  }

  /** Create or update a player in array of players
   * @param {string} lineValue The line value to parse
   * @param {integer} currentGame The currentGame
   * @param {string} arraySource The array destination
   * @param {regExp} regex regex retrieve player id
   * @return {void}
   */
  createOrUpdatePlayer(lineValue, currentGame, arraySource, regex) {
    try {
      const playerId = lineValue.match(regex)[1]
      const playerName = lineValue.match(regex)[2]
      const game = currentGame
      const kills = 0

      let player = arraySource.find(
        h =>
          h.game === game &&
          h.playerId === playerId &&
          h.playerName === playerName
      )
      if (player) {
        Object.assign(player, { playerName })
      } else {
        dataCore.pushToArray(arraySource, {
          game,
          playerId,
          playerName,
          kills
        })
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  /** Get name of a player
   * @param {*} array The array data if contain players
   * @param {*} game The current game
   * @param {*} playerId The player id
   * @return {string} The player Name or undefinned
   */
  getPlayerName(array, game, playerId) {
    try {
      let player = array.find(h => h.game === game && h.playerId === playerId)

      return player ? player.playerName : '<World>'
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new Player()
