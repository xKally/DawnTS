import { errorHandler, ErrorHandler } from './base.lib.ts'
import { DawnOptions } from './dawn.options.ts'
import * as constants from 'dawn/constants/index.ts'
import { IRouter } from 'dawn/@types/context.ts'
import { IBaseRoute } from 'dawn/route/index.ts'

export class DawnAttributes {
  protected _errorHandler: ErrorHandler
  protected _port: number
  protected _onListen: () => void
  protected _handler: (rq: Request) => Response
  protected _router: IRouter<IBaseRoute> = {
    baseFolder: constants.ROUTER_BASE_FOLDER,
    routes: new Map(),
  }

  constructor(options?: DawnOptions) {
    this._port = options?.port || constants.DEFAULT_PORT
    this._errorHandler = options?.errorHandler || errorHandler()
    this._onListen =
      options?.onListen ||
      (() => {
        console.log(`Server running on port ${this._port}`)
      })
    this._router.baseFolder = options?.routes || constants.ROUTER_BASE_FOLDER
    this._handler = function () {
      return new Response('hello world')
    }
  }
}
