export interface Context extends Request {
  user: any
}
export type Handler = (cx: Context) => Response | any

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS'

export interface IRouter<RT> {
  baseFolder: string
  routes: Map<string, Map<Method, RT>>
}
