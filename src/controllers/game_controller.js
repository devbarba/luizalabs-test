'use strict'
import { Games } from '../models'

class GameController {
  /** Show game by id from query param and search in sqlite
   * @param {*} req req
   * @param {*} res
   * @return {array} Contains the data
   */
  async index(req, res) {
    try {
      let { id } = req.params
      let game = await Games.findOne({ where: { game: id } })

      if (game)
        return res.status(200).send({
          [`game_${id}`]: {
            total_kills: game.total_kills,
            players: game.players,
            kills: game.kills,
            logs: game.log
          }
        })

      return res.status(404).send({
        message: 'No game found here :('
      })
    } catch (err) {
      if (err)
        return res.status(400).json({
          message: 'Something wrong here, sorry :`(.'
        })
      throw new Error(err)
    }
  }

  /** Show all games contained in sqlite
   * @return {array} Contains the data
   */
  async show(req, res) {
    try {
      let games = await Games.findAll()

      let result = []

      if (games.length != 0) {
        games.forEach(element => {
          result.push({
            [`game_${element.game}`]: {
              total_kills: element.total_kills,
              players: element.players,
              kills: element.kills,
              logs: element.log
            }
          })
        })

        return res.status(200).json(result)
      }

      return res.status(404).json({
        message: 'No games found here :/'
      })
    } catch (err) {
      if (err)
        return res.status(400).json({
          message: 'Something wrong here, sorry :`(.'
        })
      throw new Error(err)
    }
  }
}

export default new GameController()
