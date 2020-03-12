'use strict'
import constants from '../config/constants'
import fileReadUtil from '../utils/fileRead_util'
import dataCore from '../core/data_core'
import gameCore from '../core/game_core'
import playerCore from '../core/player_core'
import killCore from '../core/kill_core'
import { Games } from '../models'

class Parser {
  /** Responsible for making calls to methods that will parse log data
   * @param {void}
   * @return {void}
   */
  handle() {
    let lineCommands = fileReadUtil.parseLines(
      fileReadUtil.readLogFile(constants.game.log_path),
      constants.game.regex_command
    )

    this.pushToParsedLines(lineCommands)
    this.iterateWithParsedLines(dataCore.parsedLines)

    this.iterateWithGamesArray(
      dataCore.games,
      dataCore.players,
      dataCore.totalKills
    )

    this.saveDataSqlite(dataCore.games)
  }

  /** Push to parsedLines array
   * @param {array} lineCommands Array with line values and commands
   * @return {void}
   */
  pushToParsedLines(lineCommands) {
    try {
      lineCommands.forEach(element => {
        dataCore.pushToArray(dataCore.parsedLines, {
          commandType: element.lineCommand,
          lineValue: element.lineValue
        })
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  /** Iterates through the array with the values and commands and calls
   * the function to parse the contents
   * @param {array} parsedLines Array with line values and commands
   * @return {void}
   */
  iterateWithParsedLines(parsedLines) {
    try {
      dataCore.parsedLines.forEach(element => {
        this.matchCommand(element.commandType, element.lineValue)
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  /** Iterates through the final array
   * @param {array} finalArray Final data array
   * @return {void}
   */
  iterateWithGamesArray(finalArray, playersArray, totalKills) {
    try {
      finalArray.forEach(game => {
        playersArray.forEach(player => {
          if (game.game == player.game) {
            game.players.push(player.playerName)
            game.kills[player.playerName] = player.kills

            let totalKillsByGame = totalKills.find(h => h.game == game.game)

            if (totalKillsByGame) {
              game.total_kills = totalKillsByGame.totalKills
            }
          }
        })
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  /** Save all data in the sqlite db
   * @param {*} array The source array
   */
  saveDataSqlite(array) {
    try {
      array.forEach(element => {
        Games.findAndCountAll({
          where: {
            game: element.game
          }
        }).then(result => {
          if (result.count == 0)
            Games.create({
              game: element.game,
              total_kills: element.total_kills,
              players: element.players,
              kills: element.kills,
              log: element.log
            })
        })
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  /** Check which command it is and send it to the responsible function
   * to handle
   * @param {string} command Command for verification
   * @param {string} lineValue Value contained in the log file line
   * @return {Object} Object Literals calling methods for parsing
   */
  matchCommand(command, lineValue) {
    try {
      const type = {
        InitGame: () => {
          gameCore.handle()
        },
        ClientUserinfoChanged: () => {
          playerCore.handle(lineValue)
        },
        Kill: () => {
          killCore.handle(lineValue)
        },
        Default: () => {
          killCore.createWorldWithoutKills(
            dataCore.games,
            gameCore.getCurrentGame()
          )
        }
      }

      return type[command] ? type[command]() : type['Default']()
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new Parser()
