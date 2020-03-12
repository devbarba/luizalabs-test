'use strict'
import { Router } from 'express'
import gameController from './controllers/game_controller'

const routes = new Router()

routes.get('/api/games/:id', gameController.index)
routes.get('/api/games', gameController.show)

export default routes
