import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import { createLeague } from '../src/services/leagues.service'
import { createSeason } from '../src/services/seasons.service'
import {
  createCompetition,
  addTeamsToCompetition,
  removeTeamsFromCompetition,
} from '../src/services/competitions.service'
import { createTeam, createTeams } from '../src/services/teams.service'
import { teams as mockTeams } from '../mock/data/teams'

import { client, initDb } from '../src/db'
import { Team } from '../src/types'

const removeId = <T>(items: T[]) => items.map(({ id, ...rest }: any) => rest)

const start = async () => {
  await initDb()

  // const league = await createLeague({
  //   name: 'Serie A',
  // })

  // const season = await createSeason({
  //   league: league.insertedId.toString(),
  //   key: 'seriea.17/18',
  //   name: 'Serie A 2017/2018',
  // })

  // const competition = await createCompetition({
  //   key: 'seriea.2017',
  //   name: 'Serie A 17/18',
  //   league: league.insertedId.toString(),
  //   season: season.insertedId.toString(),
  //   start: new Date().getTime(),
  //   end: new Date().getTime(),
  //   teams: [],
  //   phases: [],
  // })

  // const teams = await createTeams(removeId(mockTeams))
  // const teamsInsertedIds = Object.values(teams.insertedIds).map((teamId) =>
  //   teamId.toString()
  // )

  // await addTeamsToCompetition(
  //   teamsInsertedIds, // [team.insertedId.toString()],
  //   competition.insertedId.toString()
  // )

  const r = await removeTeamsFromCompetition(
    ['636d31e3734878b3651fed56'],
    '636d31e2734878b3651fed55'
  )
  console.log(r)

  // const r = await addTeams(
  //   teams.map((team) => ({ key: team.key, name: team.name, code: team.code }))
  // )

  client.close()
}

start()
