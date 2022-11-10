import { type Team } from '../../types'

// 4 teams = 6 matches
// 5 teams = 10 matches

export const teams: Team[] = [
  {
    id: '1',
    key: 'napoli',
    name: 'Napoli',
    code: 'NAP',
  },
  {
    id: '2',
    key: 'roma',
    name: 'Roma',
    code: 'ROM',
  },
  {
    id: '3',
    key: 'milan',
    name: 'Milan',
    code: 'MIL',
  },
  {
    id: '4',
    key: 'juventus',
    name: 'Juventus',
    code: 'JUV',
  },
  // {
  //   id: '5',
  //   key: 'inter',
  //   name: 'Inter',
  //   code: 'INT',
  // },
]

export const nationalTeams: Team[] = [
  {
    id: '4',
    key: 'spain',
    name: 'Spain',
    code: 'SPA',
  },
  {
    id: '5',
    key: 'england',
    name: 'England',
    code: 'ENG',
  },
]
