// server.js
// where your node app starts

// init project
const Realm = require("realm");
const express = require("express");
const app = express();
const schemas = require('../schemas')
const seed = require('../mock/seed')
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// "League",
//         "season": "Season",
//         "start": "date",
//         "end": "date",
//         "teams": "Team[]",
//         "phases": {
//           "type": "linkingObjects",
//           "objectType": "Phase",
//           "property": "competition"
//         },
//         "groups": {
//           "type": "linkingObjects",
//           "objectType": "Group",
//           "property": "competition"
//         },
//         "rounds": {
//           "type": "linkingObjects",
//           "objectType": "Round",
//           "property": "competition"
//         }

function competitionMapper(item) {
  return {
    ...item,
    phases: item.phases.map(phase => ({ id: phase.id, name: phase.name })),
    groups: item.groups.map(group => ({ id: group.id, name: group.name })),
    rounds: item.rounds.map(round => ({ id: round.id, name: round.name })),
  }
}

function matchMapper(item) {
  return {
    id: item.id,
    name: item.name,
    phase: item.phase ? item.phase.id : null,
    group: item.group ? item.group.id : null,
    round: item.round ? item.round.id : null,
    team_home: item.team_home ? item.team_home.id : null,
    team_away: item.team_away ? item.team_away.id : null,
  }
}

function roundMapper(item) {
  return {
    ...item,
    matches: item.matches.map(match => ({
      id: match.id,
      team_home: match.team_home,
      team_away: match.team_away,
      goals_home: match.goals_home,
      goals_away: match.goals_away,
    }))
  }
}

app.get("/api", function(req, res) {
  Realm.open({
    // path: 'db/main.realm',
    path: 'tests/test.realm',
    schema: [schemas.League, schemas.Season, schemas.Competition, schemas.Phase, schemas.Group, schemas.Round, schemas.Match, schemas.Team, schemas.Lineup, schemas.Player]
  })
  .then(realm => {

    // const data = seed(realm)

    const start = 0
    const limit = 2000
    res.send({
      schemas,
      records: {
        competition: realm.objects("Competition").slice(start, limit).map(competitionMapper),
        league: realm.objects("League").slice(start, limit),
        match: realm.objects("Match").slice(start, limit).map(matchMapper),
        season: realm.objects("Season").slice(start, limit),
        team: realm.objects("Team").slice(start, limit),
        round: realm.objects("Round").slice(start, limit).map(roundMapper),
      }
    });
  })
  .catch(e => console.log(e))
});

// listen for requests :)
app.listen(8000, function() {
  console.log("Your app is listening on http://localhost:8000");
});
