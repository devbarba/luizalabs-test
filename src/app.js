'use strict'
import express from 'express'
import routes from './routes'
import parserCore from './core/parser_core'

class App {
  constructor() {
    this.server = express()
    this.parser = parserCore

    this.middlewares()
    this.routes()
    this.parsing()
  }

  middlewares() {
    this.server.use(express.json())
  }

  routes() {
    this.server.use(routes)
  }

  parsing() {
    this.parser.handle()
  }
}

export default new App().server
