'use strict'
import app from './app'
import bole from 'bole'
import constants from './config/constants'

bole.output({ level: 'debug', stream: process.stdout })
var log = bole('server')

log.info('Server starting')

app.listen(constants.port, constants.express.ip, error => {
  if (error) {
    log.error('Could not list connections', error)
    process.exit(10)
  }
  log.info(
    'Server running at http://' +
      constants.express.ip +
      ':' +
      constants.express.port
  )
})
