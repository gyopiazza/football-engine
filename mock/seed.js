const hyperid = require('hyperid')
const uuid = hyperid(true)
const serieAClubs = require('./data/seriea-clubs-2017-18.json')
const serieAMatches = require('./data/seriea-2017-18.json')

const seed = realm => {
  const data = {}
  
  realm.write(() => {
    
    // Teams
    data.serieA_teams = serieAClubs.clubs.map(team => {
      return realm.create('Team', {
        id: uuid(),
        name: team.name
      })
    })
    
    // Leagues
    data.serieA_league = realm.create('League', {
      id: uuid(),
      name: 'Serie A'
    })
    
    data.coppaItalia_league = realm.create('League', {
      id: uuid(),
      name: 'Coppa Italia'
    })
    
    // Seasons
    data.season = realm.create('Season', {
      id: uuid(),
      key: '17/18',
      name: '2017/2018'
    })
    
    // Competition: Serie A
    data.serieA_competition = realm.create('Competition', {
      id: uuid(),
      key: 'seriea.2017',
      name: 'Serie A 17/18',
      league: data.serieA_league,
      season: data.season,
      start: '2017/08/24',
      end: '2018/05/24',
      teams: data.serieA_teams
    })
//       // Competition: Coppa Italia
//       const coppaItalia_competition = realm.create('Competition', {
//         id: uuid(),
//         key: 'coppaitalia.2019',
//         name: 'Coppa Italia 19/20',
//         league: coppaItalia,
//         season: season,
//         start: '2019/08/03',
//         end: '2020/05/24',
//         teams: teams
//       })
  })
  
  return data
}

module.exports = seed