'use strict'
import { Router } from 'express'
import gameController from './controllers/game_controller'

const routes = new Router()

routes.get('/api/games/:id', gameController.index)
routes.get('/api/games', gameController.show)
routes.get('/', (req, res) => {
  res.send(
    'Muito obrigado pela oportunidade, foi bem divertido realizar o teste, espero conseguir passar :}'
  )
})

export default routes
