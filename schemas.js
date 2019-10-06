module.exports.TeamSchema = {
  name: "Team",
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: "string",
    league: "League"
  }
};

module.exports.PlayerSchema = {
  name: "Player",
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: "string",
    teams: "Team[]"
  }
};

module.exports.LeagueSchema = {
  name: "League",
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: "string",
    season: "string"
  }
};
