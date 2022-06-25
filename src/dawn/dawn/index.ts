import { serve } from 'http/server.ts'
// import { IDatabaseHandler, PostgresOptions, Models } from './@types/db.ts'
// import DatabaseHandler from './use-db.ts'
import { errorHandler, ErrorHandler } from './base.lib.ts'
import { DawnAttributes } from './dawn.attributes.ts'
import router from './dawn.router.ts'

export interface IDawn {
  // attributes
  // _db: IDatabaseHandler
  // exposed API
  // useDb(options: PostgresOptions, models: Models): Dawn
  catch(cb: ErrorHandler): Dawn
  run(port?: number, cb?: () => void): void
}

export class Dawn extends DawnAttributes implements IDawn {
  // _db = new DatabaseHandler()

  // useDb(options: PostgresOptions, models: Models) {
  //   this._db = new DatabaseHandler(options)
  //   this._db.push(models)
  //   return this
  // }

  catch(cb: ErrorHandler) {
    this._errorHandler = errorHandler(cb)
    return this
  }

  async _init() {
    // await this._db.init()
    this._handler = await router(this._router, this._errorHandler)
  }

  async run(_port?: number, _cb?: () => void) {
    await this._init()
    if (_port) this._port = _port
    if (_cb) this._onListen = _cb

    serve(this._handler, {
      port: this._port,
      onListen: this._onListen,
    })
  }
}

// get, post, put, delete
// schema
// entity
