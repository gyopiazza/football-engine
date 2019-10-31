const serieAClubs = require('./data/seriea-clubs-2017-18.json')
const serieAMatches = require('./data/seriea-2017-18.json')

const homeAway = serieAMatches.rounds.reduce((result, round) => {
  round.matches.forEach(match => {
    result[match.team1.name] = result[match.team1.name] !== undefined
      ? result[match.team1.name] + 1
      : 0
  })
  return result
}, {})

console.log(homeAway)
console.log(serieAClubs.clubs.map(team => {
  return team.name
}))