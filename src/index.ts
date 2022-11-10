import { calculateCompetition, createSchedule } from './api'

import { competitions } from '~/mock/data/competitions'
// import { leagues } from '../mock/data/leagues'
import { teams } from '../mock/data/teams'

// const competition = calculateCompetition(competitions[0])

console.log(competitions)

// Generate new schedule
const schedule = createSchedule(teams, {
  twolegs: true,
  shuffle: true,
})
