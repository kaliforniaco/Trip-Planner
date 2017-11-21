const { Strategy, ExtractJwt } = require('passport-jwt')

const Trip = require('../../../models/tripPlanner')

const SECRET = process.env.SECRET

const jwtOptions = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(jwtOptions, (jwt_payload, done) => {
  Trip.findById(jwt_payload.id)
    .then(trip => {
      if (trip) done(null, trip)
      else done(null, false)
    })
    .catch(err => done(err, false))
})

module.exports = strategy
