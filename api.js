const pointsPerWin = 3
const pointsPerDraw = 1
const pointsPerLose = 0

const addPoints = (standings, teamName, points) => {
  let teamIndex = standings.findIndex(team => team.name === teamName)
  if (teamIndex > -1) {
    standings[teamIndex].points += points
  } else {
    standings.push({
      name: teamName,
      points: points
    })
  }
  return standings
}

const standingsReducer = (standings, match) => {
    // home wins
    if (match.goals_home > match.goals_away) {
      standings = addPoints(standings, match.team_home.name, pointsPerWin)
    // teams draw
    } else if (match.goals_home === match.goals_away) {
      standings = addPoints(standings, match.team_home.name, pointsPerDraw)
      standings = addPoints(standings, match.team_away.name, pointsPerDraw)
    // away wins
    } else {
      standings = addPoints(standings, match.team_away.name)
    }
    return standings
}

const sortByPoints = (a, b) => (a.points > b.points) ? -1 : 1

module.exports = {
  standingsReducer,
  sortByPoints
}