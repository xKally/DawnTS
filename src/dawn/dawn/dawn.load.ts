// const { default: h } = await import('./routes/hello.get.ts')
import { dirname, fromFileUrl, join } from 'path'
import getFiles from 'files'
import { removeBackSlash } from 'dawn/utils/index.ts'
import { IBaseRoute } from 'dawn/route/index.ts'
import { IRouter } from 'dawn/@types/context.ts'

interface FileInfo {
  path: string
  name: string
  defaultRoute: string
  handler: IBaseRoute
}

export default async function loadRoutes(router: IRouter<IBaseRoute>) {
  const _path = join(dirname(fromFileUrl(Deno.mainModule)), router.baseFolder)

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

  for (const file of files) {
    let route = file.defaultRoute

    if (file.handler.usesAbsolutePath) {
      route = file.handler.path
    } else {
      route = join(file.defaultRoute, file.handler.path)
    }

    route = removeBackSlash(route)

    if (!router.routes.has(route)) {
      router.routes.set(route, new Map())
    }

    router.routes.get(route)?.set(file.handler.method, file.handler)
  }

  return router
}
