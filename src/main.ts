import Dawn from 'dawn/index.ts'

new Dawn().run(3000, () => {
  console.log('Server 🚀 3000')
})

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
