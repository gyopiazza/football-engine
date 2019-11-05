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

app.get("/api", function(req, res) {
  Realm.open({
    // path: 'db/main.realm',
    path: 'tests/test.realm',
    schema: [schemas.League, schemas.Season, schemas.Competition, schemas.Phase, schemas.Group, schemas.Round, schemas.Match, schemas.Team, schemas.Lineup, schemas.Player]
  })
  .then(realm => {
    res.send({
      schemas,
      records: {
        team: realm.objects("Team").slice(0, 20)
      }
    });
  })
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
