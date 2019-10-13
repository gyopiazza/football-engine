const fs = require('fs')
const test = require('tape')
const Realm = require("realm")
const hyperid = require('hyperid')
const uuid = hyperid(true)
const schemas = require('../schemas')
const api = require('../api')


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

test('Various DB Tests', function (t) {
//     t.plan(2)

//     t.equal(typeof Date.now, 'function')
//     var start = Date.now()

//     setTimeout(function () {
//         t.equal(Date.now() - start, 100)
//     }, 100)
  
  Realm.open({
    path: 'tests/test.realm',
    schema: [schemas.League, schemas.Season, schemas.Competition, schemas.Group, schemas.Round, schemas.Match, schemas.Team, schemas.Lineup, schemas.Player]
  })
  .then(realm => {
    const leagues = realm.objects("League")
    const seasons = realm.objects("Season")
    const competitions = realm.objects("Competition")
    const groups = realm.objects("Group")
    const rounds = realm.objects("Round")
    const matches = realm.objects("Match")
    const teams = realm.objects("Team")
        
    realm.write(() => {
      // Populate DB
      realm.create('League', {
        id: uuid(),
        name: 'Serie A'
      })
      realm.create('Season', {
        id: uuid(),
        key: '19/20',
        name: '2019/2020'
      })
      realm.create('Team', {
        id: uuid(),
        name: 'Napoli'
      })
      realm.create('Team', {
        id: uuid(),
        name: 'Palermo'
      })
      realm.create('Team', {
        id: uuid(),
        name: 'Bari'
      })
      realm.create('Team', {
        id: uuid(),
        name: 'Lecce'
      })
      realm.create('Competition', {
        id: uuid(),
        key: 'seriea.2019',
        name: 'Serie A 19/20',
        league: leagues[0],
        season: seasons[0],
        start: '2019/08/24',
        end: '2020/05/24',
        teams: teams
      })
      realm.create('Group', {
        id: uuid(),
        num: 1,
        name: 'All Teams',
        competition: competitions[0],
        teams: teams
      })
      realm.create('Round', {
        id: uuid(),
        num: 1,
        name: 'Matchday 1',
        knockout: false,
        competition: competitions[0],
        matches: []
      })
      realm.create('Match', {
        id: uuid(),        
        round: rounds[0],
        group: groups[0],
        start: '2019/08/24',
        team_home: teams[0],
        team_away: teams[1],
        goals_home: 0,
        goals_away: 0,
      })
      realm.create('Match', {
        id: uuid(),        
        round: rounds[0],
        group: groups[0],
        start: '2019/08/24',
        team_home: teams[2],
        team_away: teams[3],
        goals_home: 0,
        goals_away: 0,
      })
      
      // Update round with matches
      rounds[0].matches = matches
      
      // END populate DB
          
      // Test DB records
      t.ok(leagues.length, 'should have leagues')
      t.ok(teams.length, 'should have teams')
      t.ok(leagues.filtered('name = "Serie A"').length, 'should find "Serie A"')
      t.equal(rounds[0].matches.length, 2, 'should have 2 matches')

      // Test team points and standings
      
    })

    realm.close()
    t.end()
  })
  .catch(e => console.log(e))
  
  
})