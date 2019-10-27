const pointsPerWin = 3
const pointsPerDraw = 1
const pointsPerLose = 0

/**
 * Update a team's points and goals
 *
 * @param Integer points The points to add
 * @param Integer goals The goals to add
 */
const updateTeam = (standings, team, points = 0, goals = 0) => {
  // if (!standings) {
  //   standings = []
  // }
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

const standingsReducer = (standings = [], match) => {
    let newStandings = [...standings]
    // home wins
    if (match.goals_home > match.goals_away) {
      newStandings = updateTeam(newStandings, match.team_home, pointsPerWin, match.goals_home)
      newStandings = updateTeam(newStandings, match.team_away, 0, match.goals_away)
    // draw
    } else if (match.goals_home === match.goals_away) {
      newStandings = updateTeam(newStandings, match.team_home, pointsPerDraw, match.goals_home)
      newStandings = updateTeam(newStandings, match.team_away, pointsPerDraw, match.goals_away)
    // away wins
    } else if (match.goals_away > match.goals_home) {
      newStandings = updateTeam(newStandings, match.team_home, 0, match.goals_home)
      newStandings = updateTeam(newStandings, match.team_away, pointsPerWin, match.goals_away)
    }
    return newStandings
}

const standingsSorter = (a, b) => {
  if (a.points > b.points) return -1
  if (a.points < b.points) return 1
  if (a.goals > b.goals) return -1
  if (a.goals < b.goals) return 1
  return 0
}

const calculateCup = ({ competition, rounds, matches, groups }) => {
  // console.log(matches)
  return groups.reduce((standings, group) => {
    // console.log('====================')
    // console.log('====================')
    // console.log('====================')
    // console.log(matches.filter(match => match.group && match.group.name === group.name).reduce(standingsReducer, []))
    // standings[group.name] = standings[group.name] || group.teams.reduce((standings, team) => {
    //   return updateTeam(standings, team)
    // }, [])
    standings[group.name] = matches
        .filter(match => match.group && match.group.name === group.name)
        .reduce(standingsReducer, standings[group.name])
        .sort(standingsSorter)
    return standings
  }, {})
}

module.exports = {
  standingsReducer,
  standingsSorter,
  calculateCup
}