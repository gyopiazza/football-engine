// server.js
// where your node app starts

// init project
const Realm = require("realm");
const express = require("express");
const app = express();
const schemas = require('./schemas')

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
    phases: [],
    groups: [],
    rounds: [],
  }
}

app.get("/api", function(req, res) {
  Realm.open({
    // path: 'db/main.realm',
    path: 'tests/test.realm',
    schema: [schemas.League, schemas.Season, schemas.Competition, schemas.Phase, schemas.Group, schemas.Round, schemas.Match, schemas.Team, schemas.Lineup, schemas.Player]
  })
  .then(realm => {
    const start = 0
    const limit = 20
    res.send({
      schemas,
      records: {
        competition: realm.objects("Competition").slice(start, limit).map(competitionMapper),
        // league: realm.objects("League").slice(start, limit),
        // match: realm.objects("Match").slice(start, limit),
        // season: realm.objects("Season").slice(start, limit),
        team: realm.objects("Team").slice(start, limit),
      }
    });
  })
  .catch(e => console.log(e))
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
