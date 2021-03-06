/* global __BASE */
const { Strategy, ExtractJwt } = require('passport-jwt')

const UserTrip = require(`${__BASE}/models/UserTrip`)

const SECRET = process.env.SECRET

const jwtOptions = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(jwtOptions, (jwtPayload, done) => {
  UserTrip.findById(jwtPayload.id)
    .then(trip => {
      if (trip) done(null, trip)
      else done(null, false)
    })
    .catch(err => done(err, false))
})

module.exports = strategy
