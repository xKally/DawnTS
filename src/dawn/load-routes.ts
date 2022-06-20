// const { default: h } = await import('./routes/hello.get.ts')
import { dirname, fromFileUrl, join } from 'path'
import getFiles from 'files'
import { IRoute } from './handler.ts'
import { Method } from './@types/context.ts'
import { removeBackSlash } from './utils/index.ts'

interface FileInfo {
  path: string
  name: string
  defaultRoute: string
  handler: IRoute
}

export type IRouteMap = Map<string, Map<Method, IRoute>>

export default async function loadRoutes() {
  const _defaultRoutesFolderName = 'routes'

  const _path = join(
    dirname(fromFileUrl(Deno.mainModule)),
    _defaultRoutesFolderName
  )

  const _files = getFiles(_path).map(({ path, name }) => ({
    path,
    defaultRoute: join(
      '/',
      path.substring(_path.length, path.lastIndexOf('/'))
    ),
    name,
  }))

  let files: FileInfo[] = []

  for (const file of _files) {
    files = files.concat({
      ...file,
      handler: await import(`${file.path}`).then(m => m.default),
    })
  }

  const routes: IRouteMap = new Map()

  for (const file of files) {
    let route = file.defaultRoute

    if (file.handler.usesAbsolutePath) {
      route = file.handler.path
    } else {
      route = join(file.defaultRoute, file.handler.path)
    }

    route = removeBackSlash(route)

    if (!routes.has(route)) {
      routes.set(route, new Map())
    }

    routes.get(route)?.set(file.handler.method, file.handler)
  }

  return routes
}
