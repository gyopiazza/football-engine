const pointsPerWin = 3
const pointsPerDraw = 1
const pointsPerLose = 0

/**
 * Update a team's points and goals
 *
 * @param Integer points The points to add
 * @param Integer goals The goals to add
 */
const updateTeam = (standings, team, points = 0, goals = 0, goals_conceded = 0) => {
  // if (!standings) {
  //   standings = []
  // }
  let teamIndex = standings.findIndex(t => t.id === team.id)
  if (teamIndex > -1) {
    standings[teamIndex].points += (team.points || 0) + points
    standings[teamIndex].goals += (team.goals || 0) + goals
    standings[teamIndex].goals_conceded += (team.goals_conceded || 0) + goals_conceded
  } else {
    standings.push({
      ...JSON.parse(JSON.stringify(team)), // TODO: Find a better way to convert realm obj to regular obj
      points: (team.points || 0) + points,
      goals: (team.goals || 0) + goals,
      goals_conceded: (team.goals_conceded || 0) + goals_conceded,
    })
  }
  return standings
}

// Reduce a Results[Match] object into an array of objects with calculated data
const standingsReducer = (standings = [], match) => {
    // home wins
    if (match.goals_home > match.goals_away) {
      standings = updateTeam(standings, match.team_home, pointsPerWin, match.goals_home, match.goals_away)
      standings = updateTeam(standings, match.team_away, 0, match.goals_away, match.goals_home)
    // draw
    } else if (match.goals_home === match.goals_away) {
      standings = updateTeam(standings, match.team_home, pointsPerDraw, match.goals_home, match.goals_away)
      standings = updateTeam(standings, match.team_away, pointsPerDraw, match.goals_away, match.goals_home)
    // away wins
    } else if (match.goals_away > match.goals_home) {
      standings = updateTeam(standings, match.team_home, 0, match.goals_home, match.goals_away)
      standings = updateTeam(standings, match.team_away, pointsPerWin, match.goals_away, match.goals_home)
    }
    return standings
}

// Head-to-head records (results and points)
// Goal difference of head-to-head games
// Goal difference overall
// Higher number of goals scored
// Draw
const standingsSorter = (a, b) => {
  // Score
  if (a.points > b.points) return -1
  if (a.points < b.points) return 1
  // TODO: Add head-to-head rules here
  // Goal difference overall
  const diffA = a.goals - a.goals_conceded
  const diffB = b.goals - b.goals_conceded
  if (diffA > diffB) return -1
  if (diffA < diffB) return 1
  // Higher number of goals scored
  if (a.goals > b.goals) return -1
  if (a.goals < b.goals) return 1
  // Draw
  return 0
}

const calculateCup = ({ competition, phases, rounds, matches, groups }) => {
  return phases.reduce((standings, phase) => {
    standings[phase.name] = {}
    return groups.reduce((standings, group) => {
      standings[phase.name][group.name] = matches
          .filter(match => match.group && match.group.name === group.name)
          .reduce(standingsReducer, [])
          .sort(standingsSorter)
      return standings
    }, {})
    return standings
  }, {})
}

const headToHeadFilter = (teamA, teamB) => match =>
  (match.team_home.name === teamA && match.team_away.name === teamB) || (match.team_home.name === teamB && match.team_away.name === teamA)

module.exports = {
  standingsReducer,
  standingsSorter,
  calculateCup,
  headToHeadFilter
}