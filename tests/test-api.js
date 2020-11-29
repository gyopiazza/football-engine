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
        goals_home: home.id < away.id ? 2 : 1,
        goals_away: away.id < home.id ? 2 : 1,
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
  const compensate = mock.teams.length % 2 ? 0 : 2
    
  t.equal(mock.schedule.length, mock.teams.length * 2 - compensate, 'the schedule should have a correct number of rounds')
  t.ok(Object.keys(mock.homeAwayCount).length, 'should have home-away count')
  
  // Check that each team has the same amount of home-away matches
  // mock.teams.map(team => {
  //   t.equal(
  //     mock.homeAwayCount[team.name].home === mock.homeAwayReferenceValues.home &&
  //     mock.homeAwayCount[team.name].away === mock.homeAwayReferenceValues.away,
  //     true,
  //     team.name + ': number of home-away matches')
  // })
  
  const ham = mock.teams.reduce((acc, team) => {
    return mock.homeAwayCount[team.name].home === mock.homeAwayReferenceValues.home &&
           mock.homeAwayCount[team.name].away === mock.homeAwayReferenceValues.away
      ? acc + 0
      : acc + 1
  }, 0)
  t.equal(ham, 0, 'Correct number of home-away matches')
  
  const standings = mock.matches
      .reduce(api.standingsReducer, [])
      .sort(api.standingsSorter())
  
  //////////
  
  const teams = [
    { id: 1, name: 'Team 1' }, // 9
    { id: 2, name: 'Team 2' }, // 9
    { id: 3, name: 'Team 3' }, // 3
    { id: 4, name: 'Team 4' }, // 3
    { id: 5, name: 'Team 5' }, //
  ]
  
  const matches = [
    {
      team_home: { id: 2, name: "Team 2" },
      team_away: { id: 1, name: "Team 1" },
      goals_home: 2,
      goals_away: 1
    },
    {
      team_home: { id: 3, name: "Team 3" },
      team_away: { id: 4, name: "Team 4" },
      goals_home: 1,
      goals_away: 2
    },
    {
      team_home: { id: 2, name: "Team 2" },
      team_away: { id: 3, name: "Team 3" },
      goals_home: 1,
      goals_away: 2
    },
    {
      team_home: { id: 1, name: "Team 1" },
      team_away: { id: 4, name: "Team 4" },
      goals_home: 2,
      goals_away: 1
    },
    {
      team_home: { id: 4, name: "Team 4" },
      team_away: { id: 2, name: "Team 2" },
      goals_home: 1,
      goals_away: 2
    },
    {
      team_home: { id: 3, name: "Team 3" },
      team_away: { id: 1, name: "Team 1" },
      goals_home: 1,
      goals_away: 2
    },
    ///
    {
      team_home: { id: 5, name: "Team 5" },
      team_away: { id: 1, name: "Team 1" },
      goals_home: 1,
      goals_away: 2
    },
    {
      team_home: { id: 5, name: "Team 5" },
      team_away: { id: 2, name: "Team 2" },
      goals_home: 1,
      goals_away: 2
    },
    {
      team_home: { id: 5, name: "Team 5" },
      team_away: { id: 3, name: "Team 3" },
      goals_home: 1,
      goals_away: 2
    },
    {
      team_home: { id: 5, name: "Team 5" },
      team_away: { id: 4, name: "Team 4" },
      goals_home: 1,
      goals_away: 2
    },
  ];
  
  const standings2 = matches
      .reduce(api.standingsReducer, [])
      .sort(api.standingsSorter(matches))
  
  console.log('====================================')
  console.log(standings2)
  
  t.end()
})