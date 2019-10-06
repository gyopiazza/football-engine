export const TeamSchema = {
  name: "Team",
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: "string",
    league: "League"
  }
};

export const PlayerSchema = {
  name: "Player",
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: "string",
    teams: "Team[]"
  }
};

export const LeagueSchema = {
  name: "League",
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: "string",
    season: "string"
  }
};

export default {}