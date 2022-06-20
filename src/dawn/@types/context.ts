export interface Context extends Request {
  user: any
}
export type Handler = (cx: Context) => Response | any

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS'
