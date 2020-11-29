const util = require('util')
const fs = require('fs')
const test = require('tape')
const api = require('../api')

function log() {
  console.log(util.inspect([...arguments], false, null, true))
}


//////////////////////////////////////////////////////


const mockSchedule = (teamsNum, options) => {
  const teams = []
  for (let i = 1; i <= teamsNum; i++) {
    teams.push({ id: i, name: 'Team ' + i })
  }
  
  const schedule = api.generateSchedule(teams, { twolegs: true, shuffle: true })
  // Count home and away matches for each team
  const homeAwayCount = api.countHomeAwayMatches(schedule)
  // Get the first result as reference
  const homeAwayReferenceValues = homeAwayCount[Object.keys(homeAwayCount)[0]]
  
  return {
    schedule,
    homeAwayCount,
    homeAwayReferenceValues
  }
}


//////////////////////////////////////////////////////


test('API Tests', function (t) {

  const teams = [
    { id: 1, name: 'Team 1' },
    { id: 2, name: 'Team 2' },
    { id: 3, name: 'Team 3' },
    { id: 4, name: 'Team 4' },
    { id: 5, name: 'Team 5' },
    // { id: 6, name: 'Team 6' },
    // { id: 7, name: 'Team 7' },
  ]
  const compensate = teams.length % 2 ? 0 : 2
  
  const schedule = api.generateSchedule(teams, { twolegs: true, shuffle: true })
  // Count home and away matches for each team
  const homeAwayCount = api.countHomeAwayMatches(schedule)
  // Get the first result as reference
  const homeAwayReferenceValues = homeAwayCount[Object.keys(homeAwayCount)[0]]
  
  console.log('teams.length', teams.length)
  console.log('rest', teams.length % 2)
  console.log('compensate', compensate, teams.length * 2 - compensate)
  console.log('schedule', schedule.length)
  
  schedule.forEach((round, key) => {
    console.log('============')
    console.log('Round', key)
    round.forEach(match => 
      console.log(match[0] ? match[0].name : null, 'vs', match[1] ? match[1].name : null))
  })
  
  t.equal(schedule.length, teams.length * 2 - compensate, 'the schedule should have a correct number of rounds')
  t.ok(Object.keys(homeAwayCount).length, 'should have home-away count')
  
  // Check that each team has the same amount of home-away matches
  teams.map(team => {
    t.equal(
      homeAwayCount[team.name].home === homeAwayReferenceValues.home && homeAwayCount[team.name].away === homeAwayReferenceValues.away,
      true,
      team.name + ': number of home-away matches')
  })
  
  t.end()
})