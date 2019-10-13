module.exports.LeagueSchema = {
  name: "League",
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: "string",
    // country: 'Country'
  }
}

module.exports.SeasonSchema = {
  name: "Season",
  primaryKey: 'id',
  properties: {
    id: 'string',
    key: 'string',
    name: "string"
  }
}

module.exports.CompetitionSchema = {
  name: "Competition",
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: "string",
    league: "League",
    season: "Season",
    start: "date",
    end: "date"
  }
}

module.exports.TeamSchema = {
  name: "Team",
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: "string",
    league: "League"
  }
}

module.exports.PlayerSchema = {
  name: "Player",
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: "string",
    teams: "Team[]"
  }
}