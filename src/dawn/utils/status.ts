export function status(code: number, body: BodyInit) {
  const _body = body instanceof Object ? JSON.stringify(body) : body
  return new Response(_body, {
    status: code,
  })
}
