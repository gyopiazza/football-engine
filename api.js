const pointsPerWin = 3
const pointsPerDraw = 1
const pointsPerLose = 0

/**
 * Update a team's points and goals
 *
 * @param Integer points The points to add
 * @param Integer goals The goals to add
 */
const updateStandings = (standings, team, points = 0, goals = 0, goals_conceded = 0) => {
  let teamIndex = standings.findIndex(t => t.id === team.id)
  if (teamIndex > -1) {
    standings[teamIndex].points += (team.points || 0) + points
    standings[teamIndex].goals += (team.goals || 0) + goals
    standings[teamIndex].goals_conceded += (team.goals_conceded || 0) + goals_conceded
  } else {
    // TODO: Find a better way to convert realm obj to regular obj
    let parsedTeam = JSON.parse(JSON.stringify(team)) || team
    
    standings.push({
      ...parsedTeam,
      points: (parsedTeam.points || 0) + points,
      goals: (parsedTeam.goals || 0) + goals,
      goals_conceded: (parsedTeam.goals_conceded || 0) + goals_conceded,
    })
  }
  return standings
}

// Reduce a Results[Match] object into an array of objects with calculated data
const standingsReducer = (standings = [], match) => {
    // home wins
    if (match.goals_home > match.goals_away) {
      standings = updateStandings(standings, match.team_home, pointsPerWin, match.goals_home, match.goals_away)
      standings = updateStandings(standings, match.team_away, 0, match.goals_away, match.goals_home)
    // draw
    } else if (match.goals_home === match.goals_away) {
      standings = updateStandings(standings, match.team_home, pointsPerDraw, match.goals_home, match.goals_away)
      standings = updateStandings(standings, match.team_away, pointsPerDraw, match.goals_away, match.goals_home)
    // away wins
    } else if (match.goals_away > match.goals_home) {
      standings = updateStandings(standings, match.team_home, 0, match.goals_home, match.goals_away)
      standings = updateStandings(standings, match.team_away, pointsPerWin, match.goals_away, match.goals_home)
    }
    return standings
}

// Points
// Head-to-head records (results and points)
// Goal difference of head-to-head games
// Goal difference overall
// Higher number of goals scored
// Draw
const standingsSorter = (a, b) => {
  // Points
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

const processMatches = matches => matches
  .reduce(standingsReducer, [])
  .sort(standingsSorter)

// TODO: Accept only the "competition" and extract the phases from there
const calculateCompetition = (competition) => {
  // Competition has phases
  if (competition.phases && competition.phases.length) {
    return competition.phases.reduce((tables, phase) => {
      // Phase has groups
      if (phase.groups && phase.groups.length) {
        tables[phase.name] = phase.groups.reduce((standings, group) => {
          standings[group.name] = processMatches(group.matches)
          return standings
        }, {})
      // Phase doesn't have groups
      } else {
        tables[phase.name] = processMatches(phase.matches)
      }
      return tables
    }, {})
  // Competition doesn't have phases
  } else if (competition.rounds && competition.rounds.length) {
    const matches = []
    competition.rounds.forEach(round => round.matches.forEach(match => matches.push(match)))
    return processMatches(matches)
  }
}

const headToHeadFilter = (a, b) => match =>
  (match.team_home.name === a && match.team_away.name === b) || (match.team_home.name === b && match.team_away.name === a)

function shuffleArray(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**
 * Rotate array items according to the round-robin algorithm
 *
 * @param array $items
 * @return array
 */
function rotate(items) {
  let itemCount = items.length;
  if (itemCount < 3) {
    return;
  }
  const lastIndex = itemCount - 1;
  /**
   * Though not technically part of the round-robin algorithm, odd-even
   * factor differentiation included to have intuitive behavior for arrays
   * with an odd number of elements
   */
  const factor = itemCount % 2 === 0 ? itemCount / 2 : itemCount / 2 + 1;
  const topRightIndex = factor - 1;
  const topRightItem = items[topRightIndex];
  const bottomLeftIndex = factor;
  const bottomLeftItem = items[bottomLeftIndex];
  for (let i = topRightIndex; i > 0; i--) {
    items[i] = items[i - 1]
  }
  for (let i = bottomLeftIndex; i < lastIndex; i++) {
    items[i] = items[i + 1]
  }
  items[1] = bottomLeftItem;
  items[lastIndex] = topRightItem;
  return items;
}

/**
 * Generate a round-robin schedule from an array of teams
 *
 * @param array teams An array of teams which may be any valid type
 *
 * @param int rounds The number of rounds, will default to the number of
 *     rounds required for each contestant to meet all other contestants
 *
 * @param bool shuffle Whether to shuffle the teams before generating the
 *     schedule, default is true
 *
 * @return array An array of rounds, in the format of $round => $matchups,
 *     where each matchup has only two elements with the two teams as elements
 *     [0] and [1] or for a $teams array with an odd element count, may have
 *     one of these elements as null to signify a bye for the other actual team
 *     element in the matchup array
 */
function generateSchedule(teams, { twolegs = false, rounds, shuffle = true } = {}) {
  let _teams = [...teams]
  const halfTeamCount = Math.round(_teams.length / 2)
  let schedule = []

  // Account for odd number of teams by adding a bye
  if (_teams.length % 2 === 1) {
    _teams.push(null)
  }
  
  if (shuffle) {
    _teams = shuffleArray(_teams);
  }
  
  // Rounds are the number of teams minus one
  rounds = rounds || _teams.length - 1;
  
  for (let round = 0; round < rounds; round++) {
    _teams.map((team, key) => {
      if (key >= halfTeamCount) return

      const team1 = team;
      const team2 = _teams[key + halfTeamCount];

      // Home-away swapping
      const match = round % 2 === 0 ? [team1, team2] : [team2, team1];

      schedule[round] = schedule[round] || []
      schedule[round].push(match)
    })
    _teams = rotate(_teams);
  }
  
  // Remove matches with just one team (for odd teams number)
  schedule = schedule.map(round => round.filter(match => match[0] && match[1]))
  
  if (twolegs) {
    schedule = schedule.concat(schedule.map(round => round.map(match => [match[1], match[0]])))
  }
  
  return schedule;
}

// Move to some tests utilities
const countHomeAwayMatches = schedule => schedule.reduce((result, round) => {
  round.forEach(match => {
    const teamHome = match[0]
    const teamAway = match[1]
    if (!teamHome || !teamAway) return
    result[teamHome.name] = result[teamHome.name] || { home: 0, away: 0 }
    result[teamHome.name].home = result[teamHome.name].home + 1
    result[teamAway.name] = result[teamAway.name] || { home: 0, away: 0 }
    result[teamAway.name].away = result[teamAway.name].away + 1
  })
  return result
}, {})

/**
 * Queue
 */
function queue(concurrency = 1, fill = 0) {
  let running = 0
  const taskQueue = []
  let timer
  
  const runTask = task => {
    // if (fill && taskQueue.length < fill)
    running++
    task(_ => {
      running--
      if (taskQueue.length > 0) {
        runTask(taskQueue.shift())
      }
    })
  }

  const enqueueTask = task => taskQueue.push(task)

  return {
    push: task =>
      running < concurrency ? runTask(task) : enqueueTask(task),
  }
}

module.exports = {
  standingsReducer,
  standingsSorter,
  calculateCompetition,
  headToHeadFilter,
  generateSchedule,
  countHomeAwayMatches,
  queue
}