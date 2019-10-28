const hyperid = require('hyperid')
const uuid = hyperid(true)
const serieAClubs = require('./seriea-clubs-2017-18.json')
const serieAMatches = require('./seriea-2017-18.json')

const seed = (realm, done) => {
  realm.write(() => {
    
    serieAClubs.clubs.forEach(team => {
      const palermo = realm.create('Team', {
        id: uuid(),
        name: team.name
      })
    })
    
    done()
  })
}

module.exports = seed