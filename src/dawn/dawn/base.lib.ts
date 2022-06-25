import { status } from 'dawn/utils/status.ts'

function defaultErrorHandler(e: Error) {
  console.error(e)
  return status(500, 'Internal Server Error')
}

export function errorHandler(cb?: ErrorHandler) {
  if (cb) return cb
  return defaultErrorHandler
}

export type ErrorHandler = (e: Error) => Response

export function getRoutePath(url: string) {
  let path = url.substring(url.indexOf('//') + 2)
  path = path.substring(path.indexOf('/', 1))
  if (path.endsWith('/')) {
    path = path.substring(0, path.length - 1)
  }

  return path
}

export function e404() {
  return status(404, 'Not Found')
}

export function e405() {
  return status(405, 'Method Not Allowed')
}

export function e204() {
  return status(204, 'No Content')
}
