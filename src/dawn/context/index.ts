import { Context } from 'dawn/@types/context.ts'

export default function createContext(rq: Request) {
  const cx: Context = rq as Context
  cx.user = null
  return cx
}
