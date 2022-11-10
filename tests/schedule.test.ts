import type { Match, ScheduleRound, Team } from '../types'
import * as api from '../src/api'
import * as testUtils from './testUtils'
import { teams } from '../mock/data/teams'

//////////////////////////////////////////////////////

describe('Schedule', () => {
  const legs = 2
  const schedule = api.createSchedule(teams, { twolegs: legs > 1 })

  it('should have the correct number of rounds', async () => {
    const compensate = teams.length % legs ? 0 : legs // even/odd teams
    expect(schedule.length).toBe(teams.length * legs - compensate)
  })

  it('should have the correct number of matches', async () => {
    const matches = api.getMatchesFromSchedule(schedule)
    // console.log(matches)

    // one leg: teams - 1
    // two legs: (teams * 2) - 2
    // const compensate = teams.length % legs ? 0 : legs
    // const expectedMatchesTotal = teams.length * legs - legs
    const expectedMatchesTotal =
      ((teams.length * (teams.length - 1)) / 2) * legs
    expect(matches.length).toBe(expectedMatchesTotal)
  })

  it('should have a consistent number of home matches', async () => {
    const homeMatches = schedule.reduce(
      (acc: Record<string, number>, round) => {
        round.forEach(
          (match) => (acc[match[0].id] = (acc[match[0].id] || 0) + 1)
        )
        return acc
      },
      {}
    )

    expect(
      Object.values(homeMatches).every((val, i, arr) => val === arr[0])
    ).toBe(true)
  })

  it('should have a consistent number of away matches', async () => {
    const awayMatches = schedule.reduce(
      (acc: Record<string, number>, round) => {
        round.forEach(
          (match) => (acc[match[1].id] = (acc[match[1].id] || 0) + 1)
        )
        return acc
      },
      {}
    )

    expect(
      Object.values(awayMatches).every((val, i, arr) => val === arr[0])
    ).toBe(true)
  })
})
