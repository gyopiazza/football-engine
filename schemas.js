// Types
// bool properties map to JavaScript boolean values
// int, float, and double properties map to JavaScript number values. Internally ‘int’ and ‘double’ are stored as 64 bits while float is stored with 32 bits.
// string properties map to string
// data properties map to ArrayBuffer
// date properties map to Date


/*
Leagues
*/
module.exports.League = {
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
module.exports.Season = {
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
module.exports.Competition = {
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
    teams: 'Team[]',
    phases: { type: 'linkingObjects', objectType: 'Phase', property: 'competition' },
    groups: { type: 'linkingObjects', objectType: 'Group', property: 'competition' },
    rounds: { type: 'linkingObjects', objectType: 'Round', property: 'competition' },
  }
}

/*
Phases
*/
module.exports.Phase = {
  name: 'Phase',
  primaryKey: 'id',
  properties: {
    id: 'string',
    num: 'float',
    name: 'string',
    type: 'string', // knockout, two-legs, tournament
    competition: 'Competition',
    teams: 'Team[]',
    groups: { type: 'linkingObjects', objectType: 'Group', property: 'phase' },
    matches: { type: 'linkingObjects', objectType: 'Match', property: 'phase' }, // get the matches for this group
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
module.exports.Group = {
  name: 'Group',
  primaryKey: 'id',
  properties: {
    id: 'string',
    num: 'float',
    name: 'string',
    competition: 'Competition',
    teams: 'Team[]',
    phase: 'Phase',
    matches: { type: 'linkingObjects', objectType: 'Match', property: 'group' }, // get the matches for this group
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
module.exports.Round = {
  name: 'Round',
  primaryKey: 'id',
  properties: {
    id: 'string',
    num: 'float',
    name: 'string',
    competition: 'Competition',
    matches: { type: 'linkingObjects', objectType: 'Match', property: 'round' },
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
module.exports.Match = {
  name: 'Match',
  primaryKey: 'id',
  properties: {
    id: 'string',
    phase: 'Phase?',
    group: 'Group?',
    round: 'Round',
    start: 'date',
    team_home: 'Team',
    team_away: 'Team',
    goals_home: 'float',
    goals_away: 'float',
    played: { type: 'bool', default: false }
  }
}

/*
Teams
*/
module.exports.Team = {
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
module.exports.Lineup = {
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
module.exports.Player = {
  name: 'Player',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    team: 'Team',
    // country: 'Country'
  }
}

/*
Events (yellow/red cards, goals, substitutions...)
IDs: yellow, red, goal, sub
*/
module.exports.Event = {
  name: 'Event',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    team: 'Team?',
    player: 'Player?',
    match: 'Match?',
    minute: 'float?'
  }
}