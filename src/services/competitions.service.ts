import type { Competition, League, Season, Team } from '~/types'
import type { Override } from '~/typesUtils'

import { db } from '../db'
import { ObjectId } from 'mongodb'

const COLLECTION_NAME = 'competitions'

type CompetitionPayload = Override<
  Omit<Competition, 'id'>,
  { league: League['id']; season: Season['id'] }
>

export const createCompetition = async (competition: CompetitionPayload) => {
  return db.collection(COLLECTION_NAME).insertOne(competition)
}

export const createCompetitions = async (
  competitions: CompetitionPayload[]
) => {
  return db.collection(COLLECTION_NAME).insertMany(competitions)
}

export const addTeamsToCompetition = async (
  teams: Array<Team['id']>,
  competitionId: Competition['id']
) => {
  // const competition = await db
  //   .collection(COLLECTION_NAME)
  //   .findOne<Competition>({ _id: competitionId })
  return db.collection(COLLECTION_NAME).updateOne(
    { _id: new ObjectId(competitionId) },
    // {
    //   $set: {
    //     teams: [...new Set([...(competition?.teams || []), ...teams])],
    //   },
    // }
    { $addToSet: { teams: { $each: teams } } } // $push, $pull
  )
}

export const removeTeamsFromCompetition = async (
  teams: Array<Team['id']>,
  competitionId: Competition['id']
) => {
  return db
    .collection(COLLECTION_NAME)
    .updateOne({ _id: new ObjectId(competitionId) }, { $pullAll: { teams } })
}

export const getCompetitions = async () => {
  return db.collection(COLLECTION_NAME).find().toArray()
}

export const deleteAllCompetitions = async () => {
  return db.collection(COLLECTION_NAME).deleteMany({})
}
