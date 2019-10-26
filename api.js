const pointsPerWin = 3
const pointsPerDraw = 1
const pointsPerLose = 0

const addPoints = (standings, team, points) => {
  let teamIndex = standings.findIndex(t => t.id === team.id)
  if (teamIndex > -1) {
    standings[teamIndex].points += (team.points || 0) + points
  } else {
    standings.push({
      ...JSON.parse(JSON.stringify(team)), // TODO: Find a better way to convert realm obj to regular obj
      points: (team.points || 0) + points
    })
  }
  return standings
}

const standingsReducer = (standings, match) => {
    // home wins
    if (match.goals_home > match.goals_away) {
      standings = addPoints(standings, match.team_home, pointsPerWin)
    // teams draw
    } else if (match.goals_home === match.goals_away) {
      standings = addPoints(standings, match.team_home, pointsPerDraw)
      standings = addPoints(standings, match.team_away, pointsPerDraw)
    // away wins
    } else {
      standings = addPoints(standings, match.team_away, pointsPerWin)
    }
    return standings
}

const standingsSorter = (a, b) => {
  if (a.points > b.points) return -1
  if (a.points < b.points) return 1
  if (a.goals > b.goals) return -1
  if (a.goals < b.goals) return 1
  return 0
}

module.exports = {
  standingsReducer,
  standingsSorter
}