const util = require('util')
const fs = require('fs')
const test = require('tape')
const Realm = require("realm")
const hyperid = require('hyperid')
const uuid = hyperid(true)
const schemas = require('../schemas')
const api = require('../api')
const seed = require('../mock/seed')

function log() {
  console.log(util.inspect([...arguments], false, null, true))
}

// Start with a fresh DB
const files = [
  'tests/test.realm.lock',
  'tests/test.realm.note',
  'tests/test.realm',
  'tests/test.realm.management'
]

files.forEach(file => fs.existsSync(file)
  ? fs.lstatSync(file).isDirectory()
    ? fs.rmdirSync(file, { recursive: true })
    : fs.unlinkSync(file)
  : null)

//////////////////////////////////////////////////////

const countHomeAwayMatches = schedule => schedule.reduce((result, round) => {
  round.forEach(match => {
    result[match[0].name] = result[match[0].name] || { home: 0, away: 0 }
    result[match[0].name].home = result[match[0].name].home + 1
    result[match[1].name] = result[match[1].name] || { home: 0, away: 0 }
    result[match[1].name].away = result[match[1].name].away + 1
  })
  return result
}, {})

test('Various Tests', function (t) {
//     t.plan(2)

//     t.equal(typeof Date.now, 'function')
//     var start = Date.now()

//     setTimeout(function () {
//         t.equal(Date.now() - start, 100)
//     }, 100)
  
  Realm.open({
    path: 'tests/test.realm',
    schema: [schemas.League, schemas.Season, schemas.Competition, schemas.Phase, schemas.Group, schemas.Round, schemas.Match, schemas.Team, schemas.Lineup, schemas.Player]
  })
  .then(realm => {
    // Seed the test database with mock data
    const { serieA_league, coppaItalia_league, season, serieA_competition, serieA_matches } = seed(realm)
    
    const leagues = realm.objects("League")
    const seasons = realm.objects("Season")
    const competitions = realm.objects("Competition")
    const phases = realm.objects("Phase")
    const groups = realm.objects("Group")
    const rounds = realm.objects("Round")
    const matches = realm.objects("Match")
    const teams = realm.objects("Team")
    
    // Generate the standings for the current data
    const standings = matches
      .filtered('round.competition.key = "seriea.2017"')
      .reduce(api.standingsReducer, [])
      .sort(api.standingsSorter)
    
    // Generate new schedule
    const schedule = api.generateSchedule(teams, { twolegs: true, shuffle: true })
    // Count home and away matches for each team
    const homeAwayCount = countHomeAwayMatches(schedule)
    // Get the first result as reference
    const homeAwayReferenceValues = homeAwayCount[Object.keys(homeAwayCount)[0]]

    // Tests...
    
    t.ok(leagues.length, 'should have leagues')
    t.ok(teams.length, 'should have teams')
    t.equal(schedule.length, teams.length * 2 - 2, 'the schedule should have a correct number of rounds')
    t.ok(Object.keys(homeAwayCount).length, 'should have home-away count')
    
    // Check that each team has the same amount of home-away matches
    teams.map(team => {
      t.equal(
        homeAwayCount[team.name].home === homeAwayReferenceValues.home && homeAwayCount[team.name].away === homeAwayReferenceValues.away,
        true,
        team.name + ': number of home-away matches')
    })
    
    t.equal(standings[0].name, 'Juventus', 'standings: first team is correct')
    
    // console.log('=========')
    // console.log(standings) 
    
    // End tests
    realm.close()
    t.end()
  })
  .catch(e => {
    console.log(e)
    t.end()
  })
})