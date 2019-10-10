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

// files.forEach(file => fs.existsSync(file) ? fs.unlinkSync(file) : null)

test('Create League', function (t) {
//     t.plan(2)

//     t.equal(typeof Date.now, 'function')
//     var start = Date.now()

//     setTimeout(function () {
//         t.equal(Date.now() - start, 100)
//     }, 100)
  
  Realm.open({
    path: 'test.realm',
    schema: [schemas.TeamSchema, schemas.PlayerSchema, schemas.LeagueSchema]
  })
  .then(realm => {
    const leagues = realm.objects("League")
    const teams = realm.objects("Team")
        
    // Populate DB
    realm.write(() => {
      realm.create('League', {
        id: uuid(),
        name: 'Serie A',
        season: '2019/2020'
      })
      realm.create('League', {
        id: uuid(),
        name: 'Serie C',
        season: '2019/2020'
      })
      realm.create('Team', {
        id: uuid(),
        name: 'Napoli',
        league: leagues[0]
      })
      realm.create('Team', {
        id: uuid(),
        name: 'Bari',
        league: leagues[1]
      })
      
      t.ok(leagues.length)
      t.ok(teams.length)
      t.ok(leagues.filtered('name = "Serie A"').length)
      
      realm.delete(teams[0].league)
      
    })
    
    
    // t.ok(leagues[0])
    // t.equal(leagues[0].name, 'Serie A')
    // t.equal(leagues[1].name, 'Serie C')
    
    
    
    
    // realm.delete(teams[0].league)
    
    realm.close()
    t.end()
  })
  
  
})