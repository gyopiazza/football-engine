import util from 'util'
import type { Match, Round, ScheduleMatch, Team } from '../types'
import * as api from '../src/api'
// import { teams } from '../mock/data/teams'

export const log = (...args: any) => {
  console.log(util.inspect(args, false, null, true))
}

// TODO: Initialize empty array with fixed length and map, instead of push()
export const mockTeams = (teamsNum = 10) => {
  const teams: Team[] = []
  for (let i = 1; i <= teamsNum; i++) {
    teams.push({
      id: i.toString(),
      name: 'Team ' + i,
      key: 'team' + i,
      code: 'TM' + i,
    })
  }
  return teams
}

export const mockMatches = (teamsNum = 10, options = {}) => {
  const teams = mockTeams(teamsNum)
  const schedule = api.createSchedule(teams, options)

  // Count home and away matches for each team
  // const homeAwayCount = countHomeAwayMatches(schedule)
  // Get the first result as reference
  // const homeAwayReferenceValues = homeAwayCount[Object.keys(homeAwayCount)[0]]
  const matches: Match[] = api
    .getMatchesFromSchedule(schedule)
    .map((match: ScheduleMatch, i) => {
      const [home, away] = match
      return {
        id: i.toString(),
        start: new Date().getTime(),
        teamHome: home,
        teamAway: away,
        goalsHome: home.id < away.id ? 2 : 1,
        goalsAway: away.id < home.id ? 2 : 1,
      }
    })

  // const matches = schedule.reduce((acc, round) => {
  //   round.forEach((match) => {
  //     const home = match[0]
  //     const away = match[1]
  //     acc.push({
  //       teamHome: home,
  //       teamAway: away,
  //       goalsHome: home.id < away.id ? 2 : 1,
  //       goalsAway: away.id < home.id ? 2 : 1,
  //     })
  //   })
  //   return acc
  // }, [] as Round[])

  // log(matches)

  return matches
}

// TODO: ????
// export const mockRounds = (teamsNum = 10, options = {}) => {
//   const teams = mockTeams(teamsNum)
//   const schedule = api.createSchedule(teams, options)

//   // Count home and away matches for each team
//   // const homeAwayCount = countHomeAwayMatches(schedule)
//   // Get the first result as reference
//   // const homeAwayReferenceValues = homeAwayCount[Object.keys(homeAwayCount)[0]]

//   const matches = schedule.reduce((acc, round) => {
//     round.forEach((match) => {
//       const home = match[0]
//       const away = match[1]
//       acc.push({
//         teamHome: home,
//         teamAway: away,
//         goalsHome: home.id < away.id ? 2 : 1,
//         goalsAway: away.id < home.id ? 2 : 1,
//       })
//     })
//     return acc
//   }, [] as Round[])

//   log(matches)

//   return {
//     teams,
//     schedule,
//     // matches,
//     // homeAwayCount,
//     // homeAwayReferenceValues,
//   }
// }

// export const countHomeAwayMatches = (schedule) =>
//   schedule.reduce((result, round) => {
//     round.forEach((match) => {
//       const teamHome = match[0]
//       const teamAway = match[1]
//       if (!teamHome || !teamAway) return
//       result[teamHome.name] = result[teamHome.name] || { home: 0, away: 0 }
//       result[teamHome.name].home = result[teamHome.name].home + 1
//       result[teamAway.name] = result[teamAway.name] || { home: 0, away: 0 }
//       result[teamAway.name].away = result[teamAway.name].away + 1
//     })
//     return result
//   }, {})
