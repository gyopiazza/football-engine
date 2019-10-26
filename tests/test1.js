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

      const serieA = realm.create('League', {
        id: uuid(),
        name: 'Serie A'
      })
      const coppaItalia = realm.create('League', {
        id: uuid(),
        name: 'Coppa Italia'
      })
      const season = realm.create('Season', {
        id: uuid(),
        key: '19/20',
        name: '2019/2020'
      })
      
      // Teams
      const palermo = realm.create('Team', {
        id: uuid(),
        name: 'Palermo' // #0
      })
      const bari = realm.create('Team', {
        id: uuid(),
        name: 'Bari' // #1
      })
      const lecce = realm.create('Team', {
        id: uuid(),
        name: 'Lecce' // #2
      })
      const napoli = realm.create('Team', {
        id: uuid(),
        name: 'Napoli' // #3
      })
      
      // Team references
      // const palermo = teams[0]
      // const bari = teams[1]
      // const lecce = teams[2]
      // const napoli = teams[3]
      
      // Competition: Serie A
      const serieA_competition = realm.create('Competition', {
        id: uuid(),
        key: 'seriea.2019',
        name: 'Serie A 19/20',
        league: serieA,
        season: season,
        start: '2019/08/24',
        end: '2020/05/24',
        teams: teams
      })
      const serieA_group = realm.create('Group', {
        id: uuid(),
        num: 1,
        name: 'All Teams',
        competition: serieA_competition,
        teams: teams
      })
      const serieA_round1 = realm.create('Round', {
        id: uuid(),
        num: 1,
        name: 'Matchday 1',
        knockout: false,
        competition: serieA_competition,
        matches: []
      })
      const serieA_round2 = realm.create('Round', {
        id: uuid(),
        num: 1,
        name: 'Matchday 2',
        knockout: false,
        competition: serieA_competition,
        matches: []
      })

      // Matches      
      const serieA_match1 = realm.create('Match', {
        id: uuid(),
        competition: serieA_competition,
        group: serieA_group,
        round: serieA_round1,
        start: '2019/08/24',
        team_home: palermo,
        team_away: bari,
        goals_home: 1,
        goals_away: 1,
      })
      const serieA_match2 = realm.create('Match', {
        id: uuid(),
        competition: serieA_competition,
        group: serieA_group,
        round: serieA_round1,
        start: '2019/08/24',
        team_home: lecce,
        team_away: napoli,
        goals_home: 0,
        goals_away: 3,
      })
      const serieA_match3 = realm.create('Match', {
        id: uuid(),
        competition: serieA_competition,
        group: serieA_group,
        round: serieA_round2,
        start: '2019/08/31',
        team_home: napoli,
        team_away: palermo,
        goals_home: 2,
        goals_away: 0,
      })
      const serieA_match4 = realm.create('Match', {
        id: uuid(),
        competition: serieA_competition,
        group: serieA_group,
        round: serieA_round2,
        start: '2019/08/31',
        team_home: bari,
        team_away: lecce,
        goals_home: 2,
        goals_away: 2,
      })

      // Update rounds with matches
      serieA_round1.matches = [serieA_match1, serieA_match2]
      serieA_round2.matches = [serieA_match3, serieA_match4]
      
      // END Competition: Serie A
      
      // Competition: Coppa Italia
      const coppaItalia_competition = realm.create('Competition', {
        id: uuid(),
        key: 'coppaitalia.2019',
        name: 'Coppa Italia 19/20',
        league: coppaItalia,
        season: season,
        start: '2019/08/03',
        end: '2020/05/24',
        teams: teams
      })
      const coppaItalia_group1 = realm.create('Group', {
        id: uuid(),
        num: 1,
        name: 'Group 1',
        competition: coppaItalia_competition,
        teams: [palermo, lecce]
      })
      const coppaItalia_group2 = realm.create('Group', {
        id: uuid(),
        num: 2,
        name: 'Group 2',
        competition: coppaItalia_competition,
        teams: [bari, napoli]
      })
      const coppaItalia_round1 = realm.create('Round', {
        id: uuid(),
        num: 1,
        name: 'Semifinals',
        knockout: true,
        competition: coppaItalia_competition,
        matches: []
      })
      const coppaItalia_round2 = realm.create('Round', {
        id: uuid(),
        num: 1,
        name: 'Final',
        knockout: true,
        competition: coppaItalia_competition,
        matches: []
      })
      const coppaItalia_match1 = realm.create('Match', {
        id: uuid(),
        competition: coppaItalia_competition,
        group: coppaItalia_group1,
        round: coppaItalia_round1,
        start: '2019/08/03',
        team_home: palermo,
        team_away: lecce,
        goals_home: 1,
        goals_away: 2,
      })
      const coppaItalia_match2 = realm.create('Match', {
        id: uuid(),
        competition: coppaItalia_competition,
        group: coppaItalia_group1,
        round: coppaItalia_round1,
        start: '2019/08/03',
        team_home: bari,
        team_away: napoli,
        goals_home: 0,
        goals_away: 4,
      })
      
      // END Competition: Coppa Italia
      
      // END populate DB
      
      // START Test Serie A
      
      t.ok(leagues.length, 'should have leagues')
      t.ok(teams.length, 'should have teams')
      t.ok(leagues.filtered('name = "Serie A"').length, 'should find "Serie A" in leagues')
      t.equal(groups[0].teams.length, 4, 'group should have 4 teams')
      t.equal(rounds[0].matches.length, 2, 'round 1 should have 2 matches')
      t.equal(rounds[1].matches.length, 2, 'round 2 should have 2 matches')
            
      const standings = matches
        .filtered('group.competition.key = "seriea.2019"')
        .reduce(api.standingsReducer, [])
        .sort(api.standingsSorter)

      t.equal(standings[0].name, 'Napoli', '"Napoli" should be first')
      t.equal(standings[2].name, 'Lecce', '"Lecce" should be third')
      
      // END Test Serie A
      
      // START Test Coppa Italia
      const cupMatches = matches
        .filtered('group.competition.key = "coppaitalia.2019"')
        .reduce(api.calculateMatches, [])

      console.log(cupMatches)

      // END Test Coppa Italia
    })
    
    // End tests
    realm.close()
    t.end()
  })
  .catch(e => console.log(e))
  
  
})