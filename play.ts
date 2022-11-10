import * as api from './src/api'

import { mockMatches } from './tests/testUtils'
import { competitions } from './mock/data/competitions'
// const mock = mockSchedule(2, { twolegs: true, shuffle: true })
// console.log(mock)

const computed = api.calculateCompetition(competitions[0])
console.log(computed)
