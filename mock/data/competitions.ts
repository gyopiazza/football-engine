import { type Competition } from '../../types'
import { groups } from './groups'
import { leagues } from './leagues'
import { phases, worldCupPhases } from './phases'
// import { groups } from './groups'
// import { phases } from './phases'
import { rounds } from './rounds'
import { seasons } from './seasons'
import { nationalTeams, teams } from './teams'

export const competitions: Competition[] = [
  {
    id: '1',
    key: 'seriea.2017',
    name: 'Serie A 17/18',
    league: leagues[0],
    season: seasons[0],
    start: new Date('2017/08/24').getTime(),
    end: new Date('2018/05/24').getTime(),
    teams: teams,
    phases: phases,
  },
  {
    id: '2',
    key: 'fwc.2022',
    name: 'FIFA World Cup Qatar 2022',
    league: leagues[1],
    season: seasons[1],
    start: new Date('2022/11/20').getTime(),
    end: new Date('2022/12/18').getTime(),
    teams: nationalTeams,
    phases: worldCupPhases,
    // groups: groups,
  },
]
