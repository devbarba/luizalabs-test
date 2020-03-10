'use strict'
import fs from 'fs'

class FileRead {
  /** Read the log file synchronously
   * @param  {string} logFile Full path of the log file
   * @return {array} Log file line by line
   */
  readLogFile(logFile) {
    try {
      if (fs.existsSync(logFile)) {
        return fs
          .readFileSync(logFile)
          .toString()
          .split('\n')
      }

      throw new Error('The specified file in the LOG_PATH env not exists')
    } catch (err) {
      throw new Error(err)
    }
  }

  /** Check which command exists on the line and store it in an array
   * @param  {array} lines Log lines to be parsed
   * @param  {regExp} regex Regex used to separate commands
   * @return {array} log file line by line
   */
  parseLines(lines, regex) {
    try {
      let linesCommands = [
        {
          lineCommand: '',
          lineValue: ''
        }
      ]

      for (let index in lines) {
        let command = regex.test(lines[index])
          ? linesCommands.push({
              lineCommand: lines[index].match(regex)[1],
              lineValue: lines[index]
            })
          : console.log(`There is no command on the index line ${index}! `)
      }

      return linesCommands
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new FileRead()
