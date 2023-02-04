import { type Phase } from '../../src/types'
import { competitions } from './competitions'
import { nationalTeams, teams } from './teams'
import { worldCupMatches } from './matches'
import { groups } from './groups'
import { rounds } from './rounds'

export const phases: Phase[] = [
  {
    id: '2',
    num: 1,
    name: 'Andata',
    type: 'tournament',
    // teams: teams,
    rounds: [rounds[0]],
  },
  {
    id: '3',
    num: 2,
    name: 'Ritorno',
    type: 'tournament',
    rounds: [rounds[1]],
  },
]

export const worldCupPhases: Phase[] = [
  {
    id: '1',
    num: 1,
    name: 'Group stage',
    type: 'tournament',
    // competition: competitions[1],
    // teams: nationalTeams,
    groups: groups,
    // matches: worldCupMatches,
  },
]
