import { serve } from 'http/server.ts'
import { status } from './status.ts'
import loadRoutes, { IRouteMap } from './load-routes.ts'
import createContext from './create-context.ts'
import { Method } from './@types/context.ts'
import { removeBackSlash } from './utils/index.ts'

// import { IDatabaseHandler, PostgresOptions, Models } from './@types/db.ts'
// import DatabaseHandler from './use-db.ts'

export class Dawn implements IDawn {
  // _db = new DatabaseHandler()
  _routes: IRouteMap = new Map()

  private _errorHandler(e: Error): Response {
    console.error(e)
    return status(500, 'Internal Server Error')
  }

  private _rootHandler(rq: Request): Response {
    try {
      const method = rq.method as Method
      let path = rq.url.substring(rq.url.indexOf('//') + 2)
      path = path.substring(path.indexOf('/', 1))
      path = removeBackSlash(path)
      if (!this._routes.has(path)) {
        return status(404, 'Not Found')
      }

      const route = this._routes.get(path)

      if (!route?.get(method)) {
        return status(405, 'Method Not Allowed')
      }

      const cx = createContext(rq)
      const response = route?.get(method)?.handler(cx)

      if (response instanceof Response) {
        return response
      }

      if (!response) {
        return status(204, 'No Content')
      }
      return new Response(JSON.stringify(response))
    } catch (e) {
      console.log(e)
      console.log(this._errorHandler)
      return this._errorHandler(e)
    }
  }

  // useDb(options: PostgresOptions, models: Models) {
  //   this._db = new DatabaseHandler(options)
  //   this._db.push(models)
  //   return this
  // }

  catch(cb: (e: Error) => Response) {
    this._errorHandler = cb
    return this
  }

  async _init() {
    // await this._db.init()
    this._routes = await loadRoutes()
  }

  async run(port?: number, cb?: () => void) {
    await this._init()
    const _port = port || 5000
    const _cb =
      cb !== undefined
        ? cb
        : () => {
            console.log(`Server running on port ${_port}`)
          }

    serve(rq => this._rootHandler(rq), {
      port: _port,
      onListen: _cb,
    })
  }
}

export interface IDawn {
  // attributes
  // _db: IDatabaseHandler

  // exposed API
  // useDb(options: PostgresOptions, models: Models): Dawn
  catch(cb: (e: Error) => Response): Dawn
  run(port?: number, cb?: () => void): void
}

// get, post, put, delete
// schema
// entity
