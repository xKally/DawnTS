import { Model, Database, PostgresConnector, PostgresOptions } from 'db'
import { IDatabaseHandler } from './@types/db.ts'

export default class DatabaseHandler implements IDatabaseHandler {
  db: null | Database = null
  models: typeof Model[] = []

  constructor(options?: PostgresOptions) {
    if (options) {
      this.db = new Database(new PostgresConnector(options))
    }
  }

  push(models: typeof Model[]) {
    this.models = models
  }

  init() {
    if (this.db) {
      return this.db.sync({
        drop: false,
      })
    }
  }

  link() {
    if (this.db) {
      this.db.link(this.models)
    }
  }

  close() {
    if (this.db) {
      this.db.close()
    }
  }
}

// class Flight extends Model {
//   static table = 'flights'
//   static timestamps = true

//   static fields = {
//     id: { primaryKey: true, autoIncrement: true },
//     departure: DataTypes.STRING,
//     destination: DataTypes.STRING,
//     flightDuration: DataTypes.FLOAT,
//   }

//   static defaults = {
//     flightDuration: 2.5,
//   }
// }

// await db.sync({ drop: true })

// await Flight.create({
//   departure: 'Paris',
//   destination: 'Tokyo',
// })

// // or

// const flight = new Flight()
// flight.departure = 'London'
// flight.destination = 'San Francisco'
// await flight.save()

// await Flight.select('destination').all()
// // [ { destination: "Tokyo" }, { destination: "San Francisco" } ]

// await Flight.where('destination', 'Tokyo').delete()

// const sfFlight = await Flight.select('destination').find(2)
// // { destination: "San Francisco" }

// await Flight.count()
// // 1

// await Flight.select('id', 'destination').orderBy('id').get()
// // [ { id: "2", destination: "San Francisco" } ]

// await sfFlight.delete()

// await db.close()
