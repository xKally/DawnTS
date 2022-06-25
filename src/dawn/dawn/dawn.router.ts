import { IBaseRoute } from 'dawn/route/index.ts'
import { IRouter } from 'dawn/@types/context.ts'
import { ErrorHandler, getRoutePath, e404, e405, e204 } from './base.lib.ts'
import { Method } from 'dawn/@types/context.ts'
import createContext from 'dawn/context/index.ts'
import load from './dawn.load.ts'

export default async function router(
  _routerOptions: IRouter<IBaseRoute>,
  errorHandler: ErrorHandler
) {
  _routerOptions = await load(_routerOptions)

  return function (rq: Request) {
    try {
      const method = rq.method as Method
      const path = getRoutePath(rq.url)

      const routeByPath = _routerOptions.routes.get(path)

      if (!routeByPath) {
        return e404()
      }

      const route = routeByPath.get(method)

      if (!route) {
        return e405()
      }

      const cx = createContext(rq)
      const response = route.handler(cx)

      if (response instanceof Response) {
        return response
      }

      if (!response) {
        return e204()
      }

      return new Response(JSON.stringify(response))
    } catch (e) {
      return errorHandler(e)
    }
  }
}
