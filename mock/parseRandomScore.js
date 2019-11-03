const fs = require('fs')
const rounds = require('./data/mock/data/seriea-2017-18.json')


const data = rounds.map(round => {
  round.matches = round.matches.map(match => {
    
  })
  return round
})

fs.writeFile('mock/seriea-rounds.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});