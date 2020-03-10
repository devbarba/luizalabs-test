'use strict'
import constants from '../config/constants'
import fileReadUtil from '../utils/fileRead_util'
import dataCore from '../core/data_core'
import gameCore from '../core/game_core'

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

  /** Check which command it is and send it to the responsible function
   * to handle
   * @param {string} command Command for verification
   * @param {string} lineValue Value contained in the log file line
   * @return {Object} Object Literals calling methods for parsing
   */
  matchCommand(command, lineValue) {
    try {
      const type = {
        InitGame: () => {},
        ClientUserinfoChanged: () => {},
        Kill: () => {},
        Default: () => {}
      }

      return type[command] ? type[command]() : type['Default']()
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new Parser()
