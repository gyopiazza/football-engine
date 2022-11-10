import {
  Competition,
  Match,
  Round,
  ScheduleMatch,
  ScheduleRound,
  Standings,
  Team,
} from 'types'

const POINTS_PER_WIN = 3
const POINTS_PER_DRAW = 1

/**
 * Generate a round-robin schedule from an array of teams
 *
 * @param {Team[]} teams An array of teams which may be any valid type
 *
 * @param {number} rounds The number of rounds, will default to the number of
 *     rounds required for each contestant to meet all other contestants
 *
 * @param {boolean} shuffle Whether to shuffle the teams before generating the
 *     schedule, default is true
 *
 * @return {ScheduleRound[]} An array of rounds, where each match ScheduleMatch is a tuple [Team, Team].
 *     For an odd teams count, one of the elements in the tuble might be null to signify a bye.
 */
export const createSchedule = (
  teams: Team[],
  {
    twolegs = false,
    rounds = 0,
    shuffle = true,
  }: { twolegs?: boolean; rounds?: number; shuffle?: boolean }
) => {
  let _teams = [...teams]
  const halfTeamCount = Math.round(_teams.length / 2)
  let schedule: ScheduleMatch[][] = []
  // let schedule: ScheduleRound[] = []

  // Account for odd number of teams by adding a bye
  if (_teams.length % 2 === 1) {
    // @ts-ignore
    _teams.push(null)
  }

  if (shuffle) {
    _teams = shuffleArray(_teams)
  }

  // Rounds are the number of teams minus one
  rounds = rounds || _teams.length - 1

  for (let round = 0; round < rounds; round++) {
    _teams.map((team, key) => {
      if (key >= halfTeamCount) return

      const team1 = team
      const team2 = _teams[key + halfTeamCount]

      // Home-away swapping
      const match: ScheduleMatch =
        round % 2 === 0 ? [team1, team2] : [team2, team1]

      schedule[round] = schedule[round] || []
      schedule[round].push(match)
    })

    _teams = rotate(_teams)
  }

  // Remove matches with just one team (for odd teams number)
  schedule = schedule.map((round) =>
    round.filter((match) => match[0] && match[1])
  )

  if (twolegs) {
    schedule = schedule.concat(
      schedule.map((round) => round.map((match) => [match[1], match[0]]))
    )
  }

  // console.log(JSON.stringify(schedule, null, 2))

  // schedule.forEach((round, i) => {
  //   console.log('==============')
  //   console.log('Round', i)
  //   // console.log(round)
  //   round.forEach((match, j) => {
  //     console.log('-')
  //     console.log('Match', j)
  //     console.log(match)
  //   })
  // })

  return schedule
}

/**
 * Extract the matches from a schedule
 *
 * @param {ScheduleRound[]} schedule The schedule
 */
export const getMatchesFromSchedule = (schedule: ScheduleRound[]) =>
  schedule.reduce((acc, round) => {
    round.forEach((match) => acc.push(match))
    return acc
  }, []) as ScheduleMatch[]

/**
 * Update a team's points and goals
 *
 * @param {number} points The points to add
 * @param {number} goals The goals to add
 */
export const updateStandings = (
  standings: Standings[],
  team: Team,
  points = 0,
  goals = 0,
  goalsConceded = 0
) => {
  let teamIndex = standings.findIndex((t) => t.id === team.id)
  if (teamIndex > -1) {
    standings[teamIndex].points += points
    standings[teamIndex].goals += goals
    standings[teamIndex].goalsConceded += goalsConceded
    standings[teamIndex].goalsDifference =
      standings[teamIndex].goals - standings[teamIndex].goalsConceded
  } else {
    standings.push({
      id: team.id,
      name: team.name,
      points,
      goals,
      goalsConceded,
      goalsDifference: goals - goalsConceded,
    })
  }
  return standings
}

// Reduce a Match into an array of objects with computed data for points and goals
export const standingsReducer = (standings: Standings[], match: Match) => {
  const goalsHome = match.goalsHome || 0
  const goalsAway = match.goalsAway || 0

  // home wins
  if (goalsHome > goalsAway) {
    standings = updateStandings(
      standings,
      match.teamHome,
      POINTS_PER_WIN,
      goalsHome,
      goalsAway
    )
    standings = updateStandings(
      standings,
      match.teamAway,
      0,
      goalsAway,
      goalsHome
    )
    // draw
  } else if (goalsHome === goalsAway) {
    standings = updateStandings(
      standings,
      match.teamHome,
      POINTS_PER_DRAW,
      goalsHome,
      goalsAway
    )
    standings = updateStandings(
      standings,
      match.teamAway,
      POINTS_PER_DRAW,
      goalsAway,
      goalsHome
    )
    // away wins
  } else if (goalsAway > goalsHome) {
    standings = updateStandings(
      standings,
      match.teamHome,
      0,
      goalsHome,
      goalsAway
    )
    standings = updateStandings(
      standings,
      match.teamAway,
      POINTS_PER_WIN,
      goalsAway,
      goalsHome
    )
  }

  return standings
}

// Points
// Head-to-head records (results and points)
// Goal difference of head-to-head games
// Goal difference overall
// Higher number of goals scored
// Draw
export const standingsSorter = (matches: Match[]) => {
  return (a: Standings, b: Standings) => {
    // Points
    if (a.points > b.points) return -1
    if (a.points < b.points) return 1

    // head-to-head rules
    const headToHeadMatches = matches.filter(
      (match) =>
        (match.teamHome.id === a.id && match.teamAway.id === b.id) ||
        (match.teamHome.id === b.id && match.teamAway.id === a.id)
    )

    if (headToHeadMatches.length) {
      const headToHeadStandings = headToHeadMatches.reduce(standingsReducer, [])

      // head-to-head points
      const [teamAPoints, teamBPoints] = headToHeadStandings.reduce(
        (points, teamStandings) => {
          if (teamStandings.id === a.id) points[0] = teamStandings.points
          if (teamStandings.id === b.id) points[1] = teamStandings.points
          return points
        },
        [0, 0]
      )

      if (teamAPoints > teamBPoints) return -1
      if (teamAPoints < teamBPoints) return 1
      // END head-to-head points

      // head-to-head goal difference
      const [teamAGoals, teamBGoals] = headToHeadMatches.reduce(
        (goals, match) => {
          if (match.teamHome.id === a.id) {
            return [
              goals[0] + (match.goalsHome || 0),
              goals[1] + (match.goalsAway || 0),
            ]
          } else {
            return [
              goals[0] + (match.goalsAway || 0),
              goals[1] + (match.goalsHome || 0),
            ]
          }
        },
        [0, 0]
      )
      // END head-to-head goal difference

      if (teamAGoals > teamBGoals) return -1
      if (teamAGoals < teamBGoals) return 1
    }
    // END head-to-head rules

    // Goal difference overall
    const diffA = a.goals - a.goalsConceded
    const diffB = b.goals - b.goalsConceded
    if (diffA > diffB) return -1
    if (diffA < diffB) return 1

    // Higher number of goals scored
    if (a.goals > b.goals) return -1
    if (a.goals < b.goals) return 1

    // Draw
    return 0
  }
}

export const processMatches = (matches: Match[]) =>
  matches.reduce(standingsReducer, []).sort(standingsSorter(matches))

// TODO: Accept only the "competition" and extract the phases from there
export const calculateCompetition = (competition: Competition) => {
  return competition.phases.reduce((tables, phase) => {
    // Phase has groups
    // if (phase.groups && phase.groups.length) {
    //   tables[phase.name] = phase.groups.reduce((standings, group) => {
    //     standings[group.name] = processMatches(group.matches)
    //     return standings
    //   }, {})
    //   return tables
    // }

    // Phase doesn't have groups
    // tables[phase.name] = processMatches(phase.matches)
    return tables
  }, {})
}

/**
 * Shuffle array items
 *
 * @param {array} arr
 * @return array
 */
const shuffleArray = <T>(arr: T[]): T[] =>
  arr.reduceRight(
    (r: T[], _, __, s) => (
      r.push(s.splice(0 | (Math.random() * s.length), 1)[0]), r
    ),
    []
  )

/**
 * Rotate array items according to the round-robin algorithm
 *
 * @param {array} items
 * @return array
 */
const rotate = <T>(items: T[]): T[] => {
  let itemCount = items.length
  if (itemCount < 3) {
    return items
  }
  const lastIndex = itemCount - 1
  /**
   * Though not technically part of the round-robin algorithm, odd-even
   * factor differentiation included to have intuitive behavior for arrays
   * with an odd number of elements
   */
  const factor = itemCount % 2 === 0 ? itemCount / 2 : itemCount / 2 + 1
  const topRightIndex = factor - 1
  const topRightItem = items[topRightIndex]
  const bottomLeftIndex = factor
  const bottomLeftItem = items[bottomLeftIndex]
  for (let i = topRightIndex; i > 0; i--) {
    items[i] = items[i - 1]
  }
  for (let i = bottomLeftIndex; i < lastIndex; i++) {
    items[i] = items[i + 1]
  }
  items[1] = bottomLeftItem
  items[lastIndex] = topRightItem
  return items
}
