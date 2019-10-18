const pointsPerWin = 3
const pointsPerDraw = 1
const pointsPerLose = 0

// TODO: remove reduce() and make it a reducer function
// TODO: change those findIndex into a mapper function
const calculateStandings = matches =>
  matches.reduce((standings, match) => {
    if (match.goals_home > match.goals_away) {
      // home wins
      let teamIndex = standings.findIndex(team => team.name === match.team_home.name)
      if (teamIndex > -1) {
        standings[teamIndex].points += pointsPerWin
      } else {
        standings.push({
          name: match.team_home.name,
          points: pointsPerWin
        })
      }
    } else if (match.goals_home === match.goals_away) {
      // teams draw
      let teamHomeIndex = standings.findIndex(team => team.name === match.team_home.name)
      if (teamHomeIndex > -1) {
        standings[teamHomeIndex].points += pointsPerWin
      } else {
        standings.push({
          name: match.team_home.name,
          points: pointsPerDraw
        })
      }
      let teamAwayIndex = standings.findIndex(team => team.name === match.team_away.name)
      if (teamAwayIndex > -1) {
        standings[teamAwayIndex].points += pointsPerDraw
      } else {
        standings.push({
          name: match.team_away.name,
          points: pointsPerDraw
        })
      }
    } else {
      let teamIndex = standings.findIndex(team => team.name === match.team_away.name)
      if (teamIndex > -1) {
        standings[teamIndex].points += pointsPerWin
      } else {
        standings.push({
          name: match.team_away.name,
          points: pointsPerWin
        })
      }
    }
    return standings
  }, []).sort((a, b) => (a.points > b.points) ? -1 : 1)

module.exports = {
  calculateStandings
}