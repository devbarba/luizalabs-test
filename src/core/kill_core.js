'use strict'
import dataCore from './data_core'
import gameCore from './game_core'
import playerCore from './player_core'
import constants from '../config/constants'

class Kill {
  /** Responsible for making calls to methods that will parse log kills
   * @param {string} lineValue Value contained in the log file line
   * @return {void}
   */
  handle(lineValue) {
    this.createKills(lineValue, constants.game.regex_kill)
  }

  /** Create a kill in array of players and count totalKills
   * @param {string} lineValue The line value to parse
   * @param {regExp} regex regex retrieve player id
   * @return {void}
   */
  createKills(lineValue, regex) {
    try {
      const playerKill = lineValue.match(regex)[1]
      const playerKilled = lineValue.match(regex)[2]
      const mod = lineValue.match(regex)[3]
      const game = gameCore.getCurrentGame()
      const log = this.verifyLog(
        playerCore.getPlayerName(dataCore.players, game, playerKill),
        playerCore.getPlayerName(dataCore.players, game, playerKilled),
        mod
      )

      this.createLog(dataCore.games, game, log)

      if (playerKill != constants.game.world_id) {
        this.addKill(dataCore.players, game, playerKill)
        this.addTotalKills()
      } else {
        this.removeKill(dataCore.players, game, playerKilled)
        this.addTotalKills()
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  /** Add 1 to totalKills counter
   * @param {void}
   * @return {void}
   */
  addTotalKills() {
    try {
      let world = dataCore.totalKills.find(
        h => h.game == gameCore.getCurrentGame()
      )

      if (!world) {
        dataCore.pushToArray(dataCore.totalKills, {
          game: gameCore.getCurrentGame(),
          totalKills: +1
        })
      } else {
        world.totalKills++
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  /** Add 1 kill from player kill counter
   * @param {*} array Array of data to remove kill from player
   * @param {*} game The currentGame counter
   * @param {*} playerKilled Player who kill
   * @return {void}
   */
  addKill(array, game, playerKill) {
    try {
      let player = array.find(h => h.game === game && h.playerId === playerKill)
      if (player) {
        player.kills++
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  /** Remove 1 kill from player killed counter
   * @param {*} array Array of data to remove kill from player
   * @param {*} game The currentGame counter
   * @param {*} playerKilled Player was killed
   * @return {void}
   */
  removeKill(array, game, playerKilled) {
    try {
      let player = array.find(
        h => h.game === game && h.playerId === playerKilled
      )
      if (player) {
        player.kills--
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  /** Create log of kills by world
   * @param {*} array Array of data to remove kill from player
   * @param {*} game The currentGame counter
   * @param {*} log Log of kill
   * @return {void}
   */
  createLog(array, game, log) {
    try {
      let world = array.find(h => h.game === game)
      if (!world) {
        array.push({
          game,
          total_kills: 0,
          players: [],
          kills: {},
          log: []
        })
      } else {
        world.log.push(log)
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  /** Check which mod it is and send it to the responsible function
   * to return log
   * @param {integer} playerKill Id of player who killed
   * @param {integer} playerKilled Id of player was killed
   * @param {integer} mod Mod who killed
   * @return {Object} Object Literals calling methods for parsing
   */
  verifyLog(playerKill, playerKilled, mod) {
    try {
      const value = {
        0: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_UNKNOWN'
          )
        },
        1: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_SHOTGUN'
          )
        },
        2: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_GAUNTLET'
          )
        },
        3: () => {
          return (
            playerKill +
            ' matou o player ' +
            playerKilled +
            ' com MOD_MACHINEGUN'
          )
        },
        4: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_GRANADE'
          )
        },
        5: () => {
          return (
            playerKill +
            ' matou o player ' +
            playerKilled +
            ' com MOD_GRANADE_SPLASH'
          )
        },
        6: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_ROCKET'
          )
        },
        7: () => {
          return (
            playerKill +
            ' matou o player ' +
            playerKilled +
            ' com MOD_ROCKET_SPLASH'
          )
        },
        8: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_PLASMA'
          )
        },
        9: () => {
          return (
            playerKill +
            ' matou o player ' +
            playerKilled +
            ' com MOD_PLASMA_SPLASH'
          )
        },
        10: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_RAILGUN'
          )
        },
        11: () => {
          return (
            playerKill +
            ' matou o player ' +
            playerKilled +
            ' com MOD_LIGHTNING'
          )
        },
        12: () => {
          return playerKill + ' matou o player ' + playerKilled + ' com MOD_BFG'
        },
        13: () => {
          return (
            playerKill +
            ' matou o player ' +
            playerKilled +
            ' com MOD_BFG_SPLASH'
          )
        },
        14: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_WATER'
          )
        },
        15: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_SLIME'
          )
        },
        16: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_LAVA'
          )
        },
        17: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_CRUSH'
          )
        },
        18: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_TELEGRAF'
          )
        },
        19: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_FALLING'
          )
        },
        20: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_SUICIDE'
          )
        },
        21: () => {
          return (
            playerKill +
            ' matou o player ' +
            playerKilled +
            ' com MOD_TARGET_LASER'
          )
        },
        22: () => {
          return (
            playerKill +
            ' matou o player ' +
            playerKilled +
            ' com MOD_TRIGGER_HURT'
          )
        },
        23: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_NAIL'
          )
        },
        24: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_CHAINGUN'
          )
        },
        25: () => {
          return (
            playerKill +
            ' matou o player ' +
            playerKilled +
            ' com MOD_PROXIMITY_MINE'
          )
        },
        26: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_KAMIKAZE'
          )
        },
        27: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_JUICED'
          )
        },
        28: () => {
          return (
            playerKill + ' matou o player ' + playerKilled + ' com MOD_GRAPPLE'
          )
        },
        Default: () => {}
      }
      return value[mod] ? value[mod]() : value['Default']()
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new Kill()
