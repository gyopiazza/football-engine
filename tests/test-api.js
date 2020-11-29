const util = require('util')
const fs = require('fs')
const test = require('tape')
const api = require('../api')

function log() {
  console.log(util.inspect([...arguments], false, null, true))
}


//////////////////////////////////////////////////////


const mockSchedule = (teamsNum = 10, options = {}) => {
  const teams = []
  for (let i = 1; i <= teamsNum; i++) {
    teams.push({ id: i, name: 'Team ' + i })
  }
  
  const schedule = api.generateSchedule(teams, options)
  // Count home and away matches for each team
  const homeAwayCount = api.countHomeAwayMatches(schedule)
  // Get the first result as reference
  const homeAwayReferenceValues = homeAwayCount[Object.keys(homeAwayCount)[0]]
  
  const matches = schedule.reduce((acc, round) => {
    round.forEach(match => {
      const home = match[0]
      const away = match[1]
      acc.push({
        team_home: home,
        team_away: away,
        goals_home: home.id > away.id ? 2 : 1,
        goals_away: away.id > home.id ? 2 : 1,
      })
    })
    return acc
  }, [])
  
  return {
    teams,
    schedule,
    matches,
    homeAwayCount,
    homeAwayReferenceValues
  }
}


//////////////////////////////////////////////////////


test('API Tests', function (t) {
  
  const mock = mockSchedule(3, { twolegs: true, shuffle: true })
  
  // const teams = [
  //   { id: 1, name: 'Team 1' },
  //   { id: 2, name: 'Team 2' },
  //   { id: 3, name: 'Team 3' },
  //   { id: 4, name: 'Team 4' },
  //   { id: 5, name: 'Team 5' },
  //   // { id: 6, name: 'Team 6' },
  //   // { id: 7, name: 'Team 7' },
  // ]
  const compensate = mock.teams.length % 2 ? 0 : 2
  
  // const schedule = api.generateSchedule(teams, { twolegs: true, shuffle: true })
  // Count home and away matches for each team
  // const homeAwayCount = api.countHomeAwayMatches(schedule)
  // Get the first result as reference
  // const homeAwayReferenceValues = homeAwayCount[Object.keys(homeAwayCount)[0]]
  
//   console.log('teams.length', mock.teams.length)
//   console.log('rest', mock.teams.length % 2)
//   console.log('compensate', compensate, mock.teams.length * 2 - compensate)
//   console.log('schedule', mock.schedule.length)
  
//   mock.schedule.forEach((round, key) => {
//     console.log('============')
//     console.log('Round', key)
//     round.forEach(match => 
//       console.log(match[0] ? match[0].name : null, 'vs', match[1] ? match[1].name : null))
//   })
  
  t.equal(mock.schedule.length, mock.teams.length * 2 - compensate, 'the schedule should have a correct number of rounds')
  t.ok(Object.keys(mock.homeAwayCount).length, 'should have home-away count')
  
  // Check that each team has the same amount of home-away matches
  mock.teams.map(team => {
    t.equal(
      mock.homeAwayCount[team.name].home === mock.homeAwayReferenceValues.home &&
      mock.homeAwayCount[team.name].away === mock.homeAwayReferenceValues.away,
      true,
      team.name + ': number of home-away matches')
  })
  
  // console.log(mock.matches)
  
  const standings = mock.matches
      .reduce(api.standingsReducer, [])
      .sort(api.standingsSorter)
  
  console.log(standings)
  
  t.end()
})