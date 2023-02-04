import type { Team } from '~/types'

import { db } from '../db'

const COLLECTION_NAME = 'teams'

type TeamPayload = Omit<Team, 'id'>

export const createTeam = async (team: TeamPayload) => {
  return db.collection(COLLECTION_NAME).insertOne(team)
}

export const createTeams = async (teams: TeamPayload[]) => {
  return db.collection(COLLECTION_NAME).insertMany(teams)
}

export const getTeams = async () => {
  const teams = await db.collection<Team>(COLLECTION_NAME).find().toArray()
  return teams.map(({ _id, ...team }) => ({ ...team, id: _id }))
}

export const deleteAllTeams = async () => {
  return db.collection(COLLECTION_NAME).deleteMany({})
}
