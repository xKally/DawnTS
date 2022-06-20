import { get } from 'dawn/index.ts'

const route = get('/hello')

export default route

// const schemas = schema()
//     .body(joi => joi.object({
//         title: joi.string().required(),
//         content: joi.string().required()
//     }))
//     .query(joi => null) // dont allow queries
//     // not using .params() will not check the type of the params

// const route = post('/')
//     .protect(roles.admin) // if empty, it will require authentication
//     .softProtected() // it will authentify but without returnin 401
//     .body(schemas.body) // schema, thinking of a better way to do this
//     .query(schemas.query) // schema
//     .params(schemas.params) // schema
//     .useAbsolutePath() // use an absolute path
//     .useUpload('file-name', 3) // needs a file name, and number of files
//     .useUploader() // will provide a file uploader service in the request
//     .useMailer() // will provide a mailer service in the request
//     .handle(async cx => {
//         await cx.upload('/path/filename.dat', new File())
//         await cx.mail('xyz@gmail.com', 'hello world')

//         return {
//             hello: 'world'
//         }
//     })
//     .catch(e => {
//         console.log(e)
//         return status(500, 'ERROR')
//     })
