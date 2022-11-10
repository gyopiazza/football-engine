import { type Round } from '../../types'
import { competitions } from './competitions'
import { matches, worldCupMatches } from './matches'

// console.log(competitions)

export const rounds: Round[] = [
  {
    id: '1',
    num: 1,
    name: '1^ Giornata',
    // competition: competitions[0],
    matches: [matches[0]],
  },
  {
    id: '2',
    num: 2,
    name: '2^ Giornata',
    // competition: competitions[0],
    matches: [matches[1]],
  },
]

export const worldCupRounds: Round[] = [
  {
    id: '2',
    num: 1,
    name: 'First round',
    // competition: competitions[1],
    matches: worldCupMatches,
  },
]
