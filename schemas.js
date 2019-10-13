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
  "competition":{
    "key":"seriea.2019",
    "name":"Serie A 19/20"},
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
    name: 'string',
    competition: 'Competition',
    num: 'number',
    teams: 'Team[]'
  }
}

/*
Rounds

/competition/:key/rounds
/competition/seriea.2019/rounds
{
  "competition":{
    "key":"seriea.2019",
    "name":"Serie A 19/20"},
  "rounds":[
    {"num":1,"name":"Matchday 1"},
    {"num":2,"name":"Matchday 2"},
    ...
    ]
}
*/
module.exports.RoundSchema = {
  name: 'Round',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    competition: 'Competition',
    // group: 'Group',
    num: 'number'
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
Players
*/
module.exports.PlayerSchema = {
  name: 'Player',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    teams: 'Team[]',
    // country: 'Country'
  }
}