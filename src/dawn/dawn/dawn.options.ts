import { ErrorHandler } from './base.lib.ts'

export interface DawnOptions {
  port?: number
  errorHandler?: ErrorHandler
  onListen?: () => void
  routes?: string
}
