import * as validations from 'validate'
import Schema from 'validate'

export const v = validations

// const schemas = schema()
//     .body(joi => joi.object({
//         title: joi.string().required(),
//         content: joi.string().required()
//     }))
//     .query(joi => null) // dont allow queries
//     // not using .params() will not check the type of the params

// class SchemaCreator {
//   // private _body: validations.SchemaReturnType | null = null
//   private _query: any = Schema({})
//   private _params: any = Schema({})

//   body<S>(validations: S) {
//     this._body = Schema(validations)
//     return this
//   }
//   query<S>(validations: S) {
//     this._query = Schema(validations)
//     return this
//   }
//   params<S>(validations: S) {
//     this._params = Schema(validations)
//     return this
//   }

//   verifyBody(data: any) {
//     return this._body.validate(data)
//   }
// }

// export function schema() {
//   return new SchemaCreator()
// }

// const UserSchema = Schema({
//   name: string.trim().normalize().between(3, 40).optional(),
//   username: /^[a-z0-9]{3,10}$/,
//   status: Schema.either('active' as const, 'suspended' as const),
//   items: array
//     .of({
//       id: string,
//       amount: number.gte(1).integer(),
//     })
//     .min(1),
// })

// type User = Type<typeof UserSchema>
// const validator = UserSchema.destruct()

// const [err, user] = validator({
//   username: 'john1',
//   // 🚨 TypeScript Error: Type '"unregistered"' is not assignable to type '"active" | "suspended"'.
//   status: 'unregistered',
//   items: [{ id: 'item-1', amount: 20 }],
// })

// console.log(err)
