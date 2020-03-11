'use strict'
import dotenv from 'dotenv'

dotenv.config()

class Config {
  constructor() {
    this.express = {
      port: process.env.PORT || 3000,
      ip: process.env.IP || '127.0.0.1'
    }

    this.game = {
      log_path: process.env.LOG_PATH,
      world_id: process.env.WORLD_ID,
      regex_command: new RegExp(process.env.REGEX_COMMAND),
      regex_player_id: new RegExp(process.env.REGEX_PLAYERID)
    }
  }
}

export default new Config()
