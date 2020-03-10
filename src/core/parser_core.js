'use strict'
import constants from '../config/constants'
import fileReadUtil from '../utils/fileRead_util'

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
  }
}

export default new Parser()
