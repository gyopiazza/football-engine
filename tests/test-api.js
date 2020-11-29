const util = require('util')
const fs = require('fs')
const test = require('tape')
const api = require('../api')

function log() {
  console.log(util.inspect([...arguments], false, null, true))
}


//////////////////////////////////////////////////////


test('API Tests', function (t) {

  const teams = [
    { id: 1, name: 'Team 1' },
    { id: 2, name: 'Team 2' },
    { id: 3, name: 'Team 3' },
    // { id: 4, name: 'Team 4' },
  ]
  const compensate = teams.length % 2 ? 1 : 2
  
  const schedule = api.generateSchedule(teams, { twolegs: true, shuffle: true })
  // Count home and away matches for each team
  const homeAwayCount = api.countHomeAwayMatches(schedule)
  // Get the first result as reference
  const homeAwayReferenceValues = homeAwayCount[Object.keys(homeAwayCount)[0]]
  
  console.log('compensate', compensate, teams.length * 2 - compensate)
  console.log('schedule.length', schedule.length)
  
  t.equal(schedule.length, teams.length * 2 - compensate, 'the schedule should have a correct number of rounds')
  t.ok(Object.keys(homeAwayCount).length, 'should have home-away count')
  
  t.end()
})