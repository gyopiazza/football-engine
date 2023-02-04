import * as dotenv from 'dotenv'
dotenv.config()

import { deleteAllLeagues } from '../src/services/leagues.service'
import { deleteAllSeasons } from '../src/services/seasons.service'
import { deleteAllCompetitions } from '../src/services/competitions.service'
import { deleteAllTeams } from '../src/services/teams.service'

import { client, initDb } from '../src/db'

const start = async () => {
  await initDb()

  await deleteAllLeagues()
  await deleteAllCompetitions()
  await deleteAllSeasons()
  await deleteAllTeams()

  console.log('Done.')

  client.close()
}

start()
