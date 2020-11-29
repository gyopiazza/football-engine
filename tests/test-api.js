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
    { id: 4, name: 'Team 4' },
  ]
  
  const schedule = api.generateSchedule(teams, { twolegs: true, shuffle: true })
  console.log(JSON.stringify(schedule, null, 2))
  // t.ok(teams.length, 'should have teams')
  // t.equal(schedule.length, teams.length * 2 - 2, 'the schedule should have a correct number of rounds')  
  t.end()
})