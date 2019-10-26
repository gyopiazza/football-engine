const pointsPerWin = 3
const pointsPerDraw = 1
const pointsPerLose = 0

const updateTeam = (standings, team, points = 0, goals = 0) => {
  let teamIndex = standings.findIndex(t => t.id === team.id)
  if (teamIndex > -1) {
    standings[teamIndex].points += (team.points || 0) + points
    standings[teamIndex].goals += (team.goals || 0) + goals
  } else {
    standings.push({
      ...JSON.parse(JSON.stringify(team)), // TODO: Find a better way to convert realm obj to regular obj
      points: (team.points || 0) + points,
      goals: (team.goals || 0) + goals,
    })
  }
  return standings
}

const standingsReducer = (standings, match) => {
    // home wins
    if (match.goals_home > match.goals_away) {
      standings = updateTeam(standings, match.team_home, pointsPerWin, match.goals_home)
    // teams draw
    } else if (match.goals_home === match.goals_away) {
      standings = updateTeam(standings, match.team_home, pointsPerDraw, match.goals_home)
      standings = updateTeam(standings, match.team_away, pointsPerDraw, match.goals_away)
    // away wins
    } else {
      standings = updateTeam(standings, match.team_away, pointsPerWin, match.goals_away)
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