import { type Match } from '../../types'
import { nationalTeams, teams } from './teams'
import { rounds } from './rounds'
import { phases } from './phases'
import { groups } from './groups'

export const matches: Match[] = [
  {
    id: '1',
    start: new Date('2017-08-19').getTime(),
    teamHome: teams[0],
    teamAway: teams[1],
    goalsHome: 2,
    goalsAway: 0,
    played: true,
  },
  {
    id: '2',
    start: new Date('2017-08-19').getTime(),
    teamHome: teams[0],
    teamAway: teams[2],
    goalsHome: 1,
    goalsAway: 0,
    played: true,
  },
  {
    id: '3',
    start: new Date('2017-08-19').getTime(),
    teamHome: teams[1],
    teamAway: teams[2],
    goalsHome: 1,
    goalsAway: 0,
    played: true,
  },
]

export const worldCupMatches: Match[] = [
  {
    id: '1',
    // phase: phases[0],
    // group: groups[0],
    // round: rounds[0],
    start: new Date('2022/11/20').getTime(),
    teamHome: nationalTeams[0],
    teamAway: nationalTeams[1],
  },
]
