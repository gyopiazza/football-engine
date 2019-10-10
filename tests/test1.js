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

files.forEach(file => fs.existsSync(file) ? fs.unlinkSync(file) : null)

test('timing test', function (t) {
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
    const data = {
      id: uuid(),
      name: 'Serie A',
      season: '2019/2020'
    }
    realm.write(() => realm.create('League', data))
    t.ok(leagues[0])
    t.equal(leagues[0].name, 'Serie A')
  })
  
  
})