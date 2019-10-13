const fs = require('fs')
const test = require('tape')
const Realm = require("realm")
const hyperid = require('hyperid')
const uuid = hyperid(true)
const schemas = require('../schemas')

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
    schema: [schemas.TeamSchema, schemas.PlayerSchema, schemas.LeagueSchema, schemas.CompetitionSchema]
  })
  .then(realm => {
    const leagues = realm.objects("League")
    const teams = realm.objects("Team")
    const seasons = realm.objects("Team")
        
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
        name: 'Napoli',
        league: leagues[0]
      })
      realm.create('Team', {
        id: uuid(),
        name: 'Palermo',
        league: leagues[0]
      })
      realm.create('Team', {
        id: uuid(),
        name: 'Bari',
        league: leagues[0]
      })
      realm.create('Team', {
        id: uuid(),
        name: 'Lecce',
        league: leagues[0]
      })
      realm.create('Competition', {
        id: uuid(),
        key: 'seriea.2019',
        name: 'Serie A 19/20',
        league: leagues[0],
        season: seasons[0],
        start: '2019/08/24',
        end: '2020/05/24',
        teams: []
      })
      // END populate DB
          
      // Test DB records
      t.ok(leagues.length, 'should have leagues')
      t.ok(teams.length, 'should have teams')
      t.ok(leagues.filtered('name = "Serie A"').length, 'should find "Serie A"')
      t.ok(leagues.filtered('name = "Serie C"').length, 'should find "Serie C"')

      realm.delete(teams[0].league)
      t.notOk(leagues.filtered('name = "Serie A"').length, 'should have deleted "Serie A"')
      
      // Test 
      
    })

    realm.close()
    t.end()
  })
  
  
})