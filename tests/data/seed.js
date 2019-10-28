const serieAClubs = require('./seriea-clubs-2017-18.json')
const serieAMatches = require('./seriea-2017-18.json')

const seed = (realm, done) => {
  realm.write(() => {
    done()
  })
}

module.exports = seed