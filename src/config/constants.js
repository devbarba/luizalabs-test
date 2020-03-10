'use strict'
import dotenv from 'dotenv'

dotenv.config()

class Config {
  constructor() {
    this.express = {
      port: process.env.PORT || 3000,
      ip: process.env.IP || '127.0.0.1'
    }
  }
}

export default new Config()
