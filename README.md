# DAWN.TS
## Who knows what the next framework is going to sound like?

### Motivation
Backend is repetetive, and people do it badly, and I hate resetting the whole thing over and over again.
And some frameworks, over-control the structure of the code, and I don't want to have to do that.
So I want to create a progressive framework, more flexible, and custemized for our internal projects.
It should support / be:
- the same features as different frameworks, but be cooler.
- Caching with Redis, Messages with RabbitMQ, and so on.
- Real Time with Socket.IO, or AWS and so on.
- Authentication with JWT, OAUTH2, plus Authorization.
- Schema Validation with Joi, and so on.
- Upload Features, either on demand or as a middleware, with S3, probably Serverless
- Serverless Features, or could be built entirely serverless
- SQL Databases, basically PostgreSQL or Aurora in case of the Serverless option
- Fully Typed
- File System routing
- Easy Documentation and Testing
- Admin Dashboard with Monitoring and Metrics
- GraphQL Support
- Built on Deno, with Typescript
- Less Boilerplate
- Error Handling
- Dockerized, with CI/CD, and IaC
- What does the other frameworks has to offer?... 

### Project Structure
> index.get.ts is just a naming convention, and is not neccessarely means that its a GET route.
> `routes/articles/articles.post.ts`, assuming that the route in the handler is set to `/create` will resolve to `/articles/create`, or you can bypass it by using `useAbsolutePath()` in the route

```
├── src
│   ├── index.ts
│   ├── permissions.ts
│   ├── dependencies.ts
│   ├── options.ts
│   ├── env.ts
│   │
│   ├── @types
│   │   ├── articles.types.ts
│   │   └── index.ts
│   │
│   ├── routes.ts
│   │   ├── articles
│   │   │   ├── articles.post.ts
│   │   │   └── articles.get.ts
│   │   │ 
│   │   └── index.get.ts
│   │
│   ├── models
│   │   └── articles.model.ts
│   │
│   ├── services
│   │   └── articles.services.ts
│   │
│   └── utils
│       ├── string.utils.ts
│       └── index.ts
│   
├─ Dockerfile
├─ deno.json
├─ .dockerignore
├─ .gitignore
├─ iac.tf
└─ tests

```

### Things to take care of
- Deno Setup, with handling env, permissions, dependencies, and so on
- Redis, RabbitMQ, as Message Brokers
- Redis as Cache
- Routing, Dynamic Routing
- DenoDB
- CI/CD
- Web Sockets
- JWT
- Metrics
- Path Alias
- Status
- Morgan
- SERVERLESS, LIKE HOW?
- Joi
- File Upload Support, S3, Serverless
- OAuth2
- GRAPHQL ? 
- Docker
- Terraform
- Admin Dashboard
- Cors
- Testing
- useAbsolutePath
- DOCUMENTATION??
- Error Handling
- Implement a File Class Entity for uploaded content, it should be extendable for the reuse, and declarative

### Examples of what it should look like

```ts
// entrypoint.ts, or main.ts
import { Dawn, status } from 'dawn'
import env from './env'
import * as options from './options'

const app = new Dawn()
    .useDb(options.db)
    .useMetrics()
    .useDashboard()
    .useLogging(options.logging)
    .useCors(options.cors)
    .useJWT(options.jwt)
    .useMailer(options.mailer)
    .useStorage(options.storage)
    .catch((rq, e) => {
        // logger
        return status(500, 'Internal Server Error')
    })
    .run(env.port)

```

```ts
// options.ts
import { JWT, Storage } from 'dawn'
import env from './env.ts'

export const jwt: JWT = {
    secret: env.jwtSecret,
    expiresIn: env.jwtExpiresIn
}

export const storage: Storage = {
    // so on
}

```

```ts
// env.ts
import { Env } from 'dawn'
export default class Environments extends Env {
    jwtSecret() {
        return 'secret'
    }

    jwtExpiresIn() {}
}

```

```ts
// routes/articles.post.ts
import { post, schema, status } from 'dawn'

const schemas = schema()
    .body(joi => joi.object({
        title: joi.string().required(),
        content: joi.string().required()
    }))
    .query(joi => null) // dont allow queries
    // not using .params() will not check the type of the params

const route = post('/')
    .protect(roles.admin) // if empty, it will require authentication
    .softProtected() // it will authentify but without returnin 401
    .body(schemas.body) // schema, thinking of a better way to do this
    .query(schemas.query) // schema
    .params(schemas.params) // schema
    .useAbsolutePath() // use an absolute path
    .useUpload('file-name', 3) // needs a file name, and number of files
    .useUploader() // will provide a file uploader service in the request
    .useMailer() // will provide a mailer service in the request
    .handle(async cx => {
        await cx.upload('/path/filename.dat', new File())
        await cx.mail('xyz@gmail.com', 'hello world')

        return {
            hello: 'world'
        }
    })
    .catch(e => {
        console.log(e)
        return status(500, 'ERROR')
    })
```



```ts
// you can extend to add your features and functions
import { Post } from 'dawn'

class CorsedPost extends Post {
    useCors(origins: string[]) {
        if (origins.indexOf(this.origin) === -1) {
            throw new CustomCorsError() // or return false
        }
    }

    catch(e) {
        if (e instanceof CustomCorsError) {
            return {
                status: 403,
                body: {
                    error: 'Forbidden'
                }
            }
        }
        super.catch(e)
    }

}

```

#### Using Caching, with Redis
```ts


// entrypoint.ts, or main.ts
import { Dawn } from 'dawn'
import * as options from './options'

const app = new Dawn()
    .useCache(options.cache)
    .run(env.port)


// routes/*.ts
import { post } from 'dawn'

const route = post('/')
    .useCache()
    .handle(async cx => {
        const data = await cx.cache('key', () => "hello world")
        await cx.forget('key')
        return "done"
    })
```

    

#### Using message brokers, like RabbitMQ, Redis
```ts
// entrypoint.ts, or main.ts
import { Dawn } from 'dawn'
import * as options from './options'

const app = new Dawn()
    .useMQ(options.redis)
    .run(env.port)


// routes/*.ts
import { post } from 'dawn'
import * as events from './events'

const route = post('/')
    .useMQ()
    .handle(async cx => {
        await cx.emit(events.created({ msg: 'hi' }))
        return "done"
    })

// events.ts
import { event } from 'dawn'
export const created = event<{ msg: string }>('CREATED')
```

#### Testing
```ts
// routes/*.ts
import { post, test as t } from 'dawn'

const route = post('/')
    .handle(async cx => {
        const { x = 0, y = 0 } = cx.body
        return x + y
    })
    .test('should work in simple scenario', () => {
        const data = t.fetch({ x: 1, y: 7 })
        t.assert(data === 8)
    })
    .test('should defaults to 0', () => {
        const data = t.fetch({ x: 1 })
        t.assert(data === 1)
    })


```
