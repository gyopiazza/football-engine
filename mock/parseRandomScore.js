const fs = require('fs')
const serieA = require('./data/seriea-2017-18.json')


const data = {
  name: serieA.name,
  rounds: serieA.rounds.map(round => {
    round.matches = round.matches.map(match => {
      match.score1 = Math.floor(Math.random() * Math.floor(4))
      match.score2 = Math.floor(Math.random() * Math.floor(4))
      return match
    })
    return round
  })
}

fs.writeFile('mock/data/seriea-rounds.json', JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    console.log('Created: mock/data/seriea-rounds.json');
});