import type { League } from '~/types'

import { db } from '../db'

const COLLECTION_NAME = 'leagues'

export const createLeague = async (league: Omit<League, 'id'>) => {
  return db.collection(COLLECTION_NAME).insertOne(league)
}

export const createLeagues = async (leagues: Omit<League, 'id'>[]) => {
  return db.collection(COLLECTION_NAME).insertMany(leagues)
}

export const getLeagues = async () => {
  return db.collection(COLLECTION_NAME).find().toArray()
}

export const deleteAllLeagues = async () => {
  return db.collection(COLLECTION_NAME).deleteMany({})
}
