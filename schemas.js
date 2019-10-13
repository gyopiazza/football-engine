module.exports.LeagueSchema = {
  name: 'League',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    // country: 'Country'
  }
}

module.exports.SeasonSchema = {
  name: 'Season',
  primaryKey: 'key',
  properties: {
    id: 'string',
    key: 'string',
    name: 'string'
  }
}

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

module.exports.RoundSchema = {
  name: 'Round',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    competition: 'Competition',
    num: 'number'
  }
}

module.exports.TeamSchema = {
  name: 'Team',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    // country: 'Country'
  }
}

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