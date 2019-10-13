/*
Leagues
*/
module.exports.LeagueSchema = {
  name: 'League',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    // country: 'Country'
  }
}

/*
Seasons
*/
module.exports.SeasonSchema = {
  name: 'Season',
  primaryKey: 'key',
  properties: {
    id: 'string',
    key: 'string',
    name: 'string'
  }
}

/*
Competitions
*/
module.exports.CompetitionSchema = {
  name: 'Competition',
  primaryKey: 'key',
  properties: {
    id: 'string',
    key: 'string',
    name: 'string',
    league: 'League',
    season: 'Season',
    start: 'date',
    end: 'date',
    teams: 'Team[]'
  }
}

/*
Groups

/competition/:key/groups
/competition/seriea.2019/groups
{
  "competition":{ "key":"seriea.2019", "name":"Serie A 19/20"},
  "rounds":[
    {"num":1,"name":"Group A"},
    {"num":2,"name":"Group B"},
    ...
  ]
}
*/
module.exports.GroupSchema = {
  name: 'Group',
  primaryKey: 'id',
  properties: {
    id: 'string',
    num: 'number',
    name: 'string',
    competition: 'Competition',
    teams: 'Team[]'
  }
}

/*
Rounds

/competition/:key/rounds
/competition/seriea.2019/rounds
{
  "competition":{ "key":"seriea.2019", "name":"Serie A 19/20"},
  "rounds":[
    {"num":1,"name":"Matchday 1", start: '2019/08/24', end: '2019/08/24'},
    {"num":2,"name":"Matchday 2", start: '2019/08/24', end: '2019/08/24'},
    ...
  ]
}
*/
module.exports.RoundSchema = {
  name: 'Round',
  primaryKey: 'id',
  properties: {
    id: 'string',
    num: 'number',
    name: 'string',
    knockout: { type: 'boolean', default: false },
    competition: 'Competition',
    matches: 'Match[]'
  }
}

/*
Matches

/competition/:key/round/:num|today|next
/competition/seriea.2019/round/2 - Serie A 19/20 Matchday 2
/competition/seriea.2019/round/today - Serie A 19/20 Today's Matchday
/competition/seriea.2019/round/next - Serie A 19/20 Next Matchday

{
  "competition": "competition":{ "key":"seriea.2019", "name":"Serie A 19/20"},
  "round": {"num":2,"name":"Matchday 2","start":"2019/09/13","end":"2019/09/13"},
  "games":[
    {"team_home": <Team>, "team_away": <Team>, "goals_home": 1, "goals_away": 0, "start": 2019/09/13 15:00"}
    ...
  ]
}
*/
module.exports.MatchSchema = {
  name: 'Match',
  primaryKey: 'id',
  properties: {
    id: 'string',
    num: 'number',
    name: 'string',
    round: 'Round',
    group: 'Group',
    start: 'date',
    team_home: 'Team',
    team_away: 'Team',
    goals_home: 'number',
    goals_away: 'number',
  }
}

/*
Teams
*/
module.exports.TeamSchema = {
  name: 'Team',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    // country: 'Country'
  }
}

/*
Lineups
*/
module.exports.LineupSchema = {
  name: 'Lineup',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    team: 'Team',
    players: 'Player[]',
    match: 'Match'
  }
}

/*
Players
*/
module.exports.PlayerSchema = {
  name: 'Player',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    team: 'Team[]',
    // country: 'Country'
  }
}