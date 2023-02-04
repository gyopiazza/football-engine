import type { League, Season } from '~/types'
import type { Override } from '~/typesUtils'

import { db } from '../db'

const COLLECTION_NAME = 'seasons'

type SeasonPayload = Override<Omit<Season, 'id'>, { league: League['id'] }>

export const createSeason = async (season: SeasonPayload) => {
  return db.collection(COLLECTION_NAME).insertOne(season)
}

export const createSeasons = async (seasons: SeasonPayload[]) => {
  return db.collection(COLLECTION_NAME).insertMany(seasons)
}

export const getSeasons = async () => {
  return db.collection(COLLECTION_NAME).find().toArray()
}

export const deleteAllSeasons = async () => {
  return db.collection(COLLECTION_NAME).deleteMany({})
}
