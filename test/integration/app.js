describe('Route Games', () => {
  const defaultGame = {
    ['game_1']: {
      total_kills: 0,
      players: ['Isgalamido'],
      kills: {
        Isgalamido: 0
      },
      logs: []
    }
  }

  describe('Route GET /games/:id data SUCCESS', () => {
    it('should return a object that contains game data', done => {
      request.get('/api/games/1').end((err, res) => {
        expect(res.body['game_1']).to.be.eql(defaultGame['game_1'])
        done(err)
      })
    })
  })

  describe('Route GET /games/:id status 200', () => {
    it('should return a 200 status', done => {
      request.get('/api/games/1').end((err, res) => {
        expect(res.status).to.be.eql(200)
        expect(res.body['game_1']).to.be.eql(defaultGame['game_1'])
        done(err)
      })
    })
  })

  describe('Route GET /games/:id status 404', () => {
    it('should return a 404 status and message', done => {
      request.get('/api/games/999').end((err, res) => {
        expect(res.status).to.be.eql(404)
        expect(res.body.message).to.be.eql('No game found here :(')
        done(err)
      })
    })
  })

  describe('Route GET /games data SUCCESS', () => {
    it('should return a multiples objects that contains game data', done => {
      request.get('/api/games').end((err, res) => {
        for (let index = 1; index <= 21; index++) {
          expect(res.body[index - 1][`game_${index}`]).to.be.a('object')
        }
        done(err)
      })
    })
  })

  describe('Route GET /games 200 status', () => {
    it('should return a 200 status', done => {
      request.get('/api/games/').end((err, res) => {
        expect(res.status).to.be.eql(200)
        done(err)
      })
    })
  })
})
