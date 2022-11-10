import type { Match, ScheduleRound, Team } from '../types'
import * as api from '../src/api'
import * as testUtils from './testUtils'

//////////////////////////////////////////////////////

describe('Standings', () => {
  const twolegs = true
  const numberOfTeams = 8
  const matches = testUtils.mockMatches(numberOfTeams, { twolegs })
  const standings = api.processMatches(matches)

  it('should have the correct team standings', async () => {
    expect(standings.length).toBe(numberOfTeams)
  })

  it('should have the correct first team', async () => {
    expect(standings[0].id).toBe('1')
  })

  it('should have the correct last team', async () => {
    expect(standings[standings.length - 1].id).toBe(numberOfTeams.toString())
  })
})
