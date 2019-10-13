const pointsPerWin = 3
const pointsPerDraw = 1
const pointsPerLose = 0

const calculateStandings = matches =>
  matches.reduce((standings, match) => {
    if (match.goals_home > match.goals_away) {
      // home wins
      let teamIndex = standings.findIndex(team => team.name === match.team_home.name)
      if (teamIndex > -1) {
        standings[teamIndex].points += 3
      } else {
        standings.push({
          name: match.team_home.name,
          points: 3
        })
      }
    } else if (match.goals_home === match.goals_away) {
      // teams draw
    } else {
      // away wins
    }
  }, [])

module.exports = {
  calculateStandings
}