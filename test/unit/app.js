import fileReadUtils from '../../src/utils/fileRead_util'
import dataCore from '../../src/core/data_core'
import gameCore from '../../src/core/game_core'
import killCore from '../../src/core/kill_core'
import parserCore from '../../src/core/parser_core'
import playerCore from '../../src/core/player_core'
import constants from '../../src/config/constants'

describe('Read games.log with readLogFile()', () => {
  it('expect return an array with log lines splited', function() {
    expect(fileReadUtils.readLogFile(constants.game.log_path)).to.be.a('array')
  })

  it('assert return an error cause by incorret param', function() {
    assert.throws(() => {
      fileReadUtils.readLogFile('./test.test')
    }, Error)
  })
})

describe('Read and parse data returned by readLogFile(), causes SUCCESS', () => {
  it('expect return an array with log commands and lineValue', function() {
    const logData = [
      ' Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
      ' Kill: 3 4 7: Isgalamido killed Zeh by MOD_ROCKET_SPLASH'
    ]

    expect(
      fileReadUtils.parseLines(logData, constants.game.regex_command)
    ).to.be.an('array')
  })

  it('assert return an error caused by incorrect param', function() {
    assert.throws(() => {
      fileReadUtils.parseLines('Mocha')
    }, Error)
  })
})

describe('Get player name', () => {
  const array = [
    {
      game: 1,
      playerId: 100,
      playerName: 'Luizalabs'
    }
  ]

  it('expect return an string with playerName', function() {
    expect(playerCore.getPlayerName(array, 1, 100))
      .to.be.an('string')
      .to.equal('Luizalabs' || '<world>')
  })

  it('assert return an error if incorrect params are inserted', function() {
    assert.throws(() => {
      playerCore.getPlayerName('Mocha', 'Chai', 1)
    }, Error)
  })
})

describe('Add 1 to currentGame counter', () => {
  it('expect return and add 1 to gameCounter', function() {
    expect(gameCore.newGame()).to.be.eql(21)
  })

  it('assert return throw', function() {
    assert.throws(() => {
      gameCore.newGame().to.be.eql(11)
    }, Error)
  })
})

describe('Get currentGame()', () => {
  it('expect return an integer for currentGame', function() {
    expect(gameCore.getCurrentGame()).to.be.eql(23)
  })
})
