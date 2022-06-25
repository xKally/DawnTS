import { Handler, Method } from 'dawn/@types/context.ts'

export interface IBaseRoute {
  //   useAbsolutePath(): Route
  handle: (h: Handler) => Route
  path: string
  method: Method
  usesAbsolutePath: boolean
  handler: Handler
}

export class Route implements IBaseRoute {
  private _path = '/'
  // private _method: Method = 'GET'
  private _usingAbsolutePath = false
  // private _handler: Handler = () => {
  //   return status(501, 'Not Implemented')
  // }

  //   constructor(method: Method, path?: string) {
  // this._method = method
  // if (path) {
  //   this._path = path
  // }
  //   }

  useAbsolutePath() {
    this._usingAbsolutePath = true
    return this
  }

  // handle(h: Handler) {
  //   this._handler = h
  //   return this
  // }

  get path() {
    return this._path
  }

  get usesAbsolutePath() {
    return this._usingAbsolutePath
  }

  //   get method() {
  //     // return this._method
  //   }

  //   get handler() {
  //     // return this._handler
  //   }
}
