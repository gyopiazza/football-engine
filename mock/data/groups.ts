import { type Group } from '../../types'
import { competitions } from './competitions'
import { nationalTeams } from './teams'
import { phases } from './phases'
import { worldCupMatches } from './matches'

export const groups: Group[] = [
  {
    id: '1',
    num: 1,
    name: 'Group A',
    // competition: competitions[1],
    teams: nationalTeams,
    // phase: phases[0],
    matches: worldCupMatches,
  },
]
