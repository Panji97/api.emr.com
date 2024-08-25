import * as bcrypt from 'bcrypt'
import { model } from '../../models'
import { usersAttributes } from '../../models/users'

export class AuthenticationService {
  async register(payload: usersAttributes) {
    const userExist = await model.users.findByPk(payload.email)

    if (userExist) throw new Error('Email already exist')

    const hashPassword = await bcrypt.hash(payload.password, 12)

    return await model.users.create({
      email: payload.email,
      password: hashPassword
    })
  }
}
