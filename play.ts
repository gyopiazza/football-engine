import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import * as api from './src/api'

import { mockMatches } from './tests/testUtils'
import { competitions } from './mock/data/competitions'
// const mock = mockSchedule(2, { twolegs: true, shuffle: true })
// console.log(mock)
import { addTeam, getTeams } from './src/teams-service'
import './src/teams-service'

// const computed = api.calculateCompetition(competitions[0])
// console.log(computed)

const start = async () => {
  // addTeam({
  //   key: 'napoli',
  //   name: 'Napoli',
  //   code: 'NAP',
  // })

  const teams = await getTeams()
  console.log(teams[0]._id.toString())
}

start()
