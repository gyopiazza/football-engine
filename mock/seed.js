const hyperid = require('hyperid')
const uuid = hyperid(true)
const serieAClubs = require('./data/seriea-clubs-2017-18.json')
const serieAMatches = require('./data/seriea-2017-18.json')

const seed = realm => {
  realm.write(() => {
    
    // Teams
    serieAClubs.clubs.forEach(team => {
      const palermo = realm.create('Team', {
        id: uuid(),
        name: team.name
      })
    })
    
    // Leagues
    realm.create('League', {
      id: uuid(),
      name: 'Serie A'
    })
    realm.create('League', {
      id: uuid(),
      name: 'Coppa Italia'
    })
    
    // Seasons
    realm.create('Season', {
      id: uuid(),
      key: '19/20',
      name: '2019/2020'
    })
    
    
  })
}

module.exports = seed