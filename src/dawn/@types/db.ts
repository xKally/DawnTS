import { Model, Database } from 'db'
export type { PostgresOptions } from 'db'

export type Models = typeof Model[]

export interface IDatabaseHandler {
  db: null | Database
  models: Models
  push(models: Models): void
  init(): void | Promise<void>
  link(): void
  close(): void
}
