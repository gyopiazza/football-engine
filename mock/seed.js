const hyperid = require('hyperid')
const uuid = hyperid(true)
const serieAClubs = require('./data/seriea-clubs-2017-18.json')
const serieAMatches = require('./data/seriea-2017-18.json')

const seed = realm => {
  const data = {}
  
  realm.write(() => {
    const teams = realm.objects("Team")
    
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
    
    
    
    
    
    
    // Rounds & Matches
    
//     function saveRound(round, index) {
//       // realm.write(() => {
//         realm.beginTransaction()
//         const r = realm.create('Round', {
//           id: uuid(),
//           num: index + 1,
//           name: 'Matchday ' + (index + 1),
//           competition: data.serieA_competition,
//           matches: []
//         })
        
//         round.forEach(match => {
//           const m = realm.create('Match', {
//             id: uuid(),
//             round: r,
//             start: '2019/08/24',
//             team_home: match[0],
//             team_away: match[1],
//             goals_home: 0,
//             goals_away: 0,
//           })
//         })
//         realm.commitTransaction()
//       // })
//     }
    
    // for (let i = 0; i < schedule.length; i++) {
    //   saveRound(schedule[i], i)
    // }
    
    // "rounds": [
    // {
    //   "name": "1^ Giornata",
    //   "matches": [
    //     {
    //       "date": "2017-08-19",
    //       "team1": {
    //         "key": "juventus",
    //         "name": "Juventus",
    //         "code": "JUV"
    //       },
    //       "team2": {
    //         "key": "cagliari",
    //         "name": "Cagliari",
    //         "code": "CAG"
    //       },
    //       "score1": null,
    //       "score2": null
    //     },
    
    
    const teamsCache = {}
    function getTeamByName(teamName) {
      return teamsCache[teamName.toLowerCase()] || teams.filtered('name ==[c] $0', teamName)
    }
    
    // console.log(getTeamByName('Napoli'))
        
    data.serieA_rounds = serieAMatches.rounds.map((round, index) => {
      realm.beginTransaction()
        const r = realm.create('Round', {
          id: uuid(),
          num: index,
          name: round.name,
          competition: data.serieA_competition,
          matches: []
        })
      
        const matches = round.matches.forEach(match => {
          return realm.create('Match', {
            id: uuid(),
            round: r,
            start: match.date,
            team_home: match.team1.name,
            team_away: match.team2.name,
            goals_home: 0,
            goals_away: 0,
          })
        })
        
        r.matches = matches
      
        realm.commitTransaction()
    })
    
  })
  
  return data
}

module.exports = seed