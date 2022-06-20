import { Handler, Method } from './@types/context.ts'
import { status } from './status.ts'

export class Route implements IRoute {
  private _path = '/'
  private _method: Method = 'GET'
  private _usingAbsolutePath = false
  private _handler: Handler = () => {
    return status(501, 'Not Implemented')
  }

  constructor(method: Method, path?: string) {
    this._method = method
    if (path) {
      this._path = path
    }
  }

  useAbsolutePath() {
    this._usingAbsolutePath = true
    return this
  }

  handle(h: Handler) {
    this._handler = h
    return this
  }

  get path() {
    return this._path
  }

  get usesAbsolutePath() {
    return this._usingAbsolutePath
  }

  get method() {
    return this._method
  }

  get handler() {
    return this._handler
  }
}

export interface IRoute {
  useAbsolutePath(): Route
  handle: (h: Handler) => Route
  path: string
  method: Method
  usesAbsolutePath: boolean
  handler: Handler
}

export function post(path?: string) {
  return new Route('POST', path)
}

export function get(path?: string) {
  return new Route('GET', path)
}

export function put(path?: string) {
  return new Route('PUT', path)
}

export function kill(path?: string) {
  return new Route('DELETE', path)
}
