import Dawn from 'dawn/index.ts'

new Dawn().run(3000, () => {
  console.log('Server 🚀 3000')
})

// function status(code: number, body: any) {
//   return new Response(JSON.stringify(body), {
//     status: code,
//   })
// }

// function handler(req: Request): Response {
//   console.log(req)

//   return status(209, {
//     hello: 'World!',
//   })
// }

// serve(handler, {
//   port: 5000,
// })

// import { Dawn, status } from 'dawn'
// import env from './env'
// import * as options from './options'

// const app = new Dawn()
//     .useDb(options.db)
//     .useMetrics()
//     .useDashboard()
//     .useLogging(options.logging)
//     .useCors(options.cors)
//     .useJWT(options.jwt)
//     .useMailer(options.mailer)
//     .useStorage(options.storage)
//     .catch((rq, e) => {
//         // logger
//         return status(500, 'Internal Server Error')
//     })
//     .run(env.port)
