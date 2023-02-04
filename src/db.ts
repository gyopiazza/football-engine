import * as mongoDB from 'mongodb'

export let db: mongoDB.Db

export const client = new mongoDB.MongoClient(process.env.MONGODB_URI || '', {
  serverApi: mongoDB.ServerApiVersion.v1,
})

export const initDb = async () => {
  if (!db) {
    await client.connect()
    db = client.db('fen')
  }
  return db
}
