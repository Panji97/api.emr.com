import { sign } from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { SECRET_JWT } from '../../uhuuy.json'
import { model } from '../../models'
import { usersAttributes } from '../../models/users'
import { AppError } from '../../exception/exception.custom'

export class AuthenticationService {
  async register(payload: usersAttributes) {
    const userExist = await model.users.findByPk(payload.email)

    if (userExist) throw new AppError('Email already exist', 409)

    const hashPassword = await bcrypt.hash(payload.password, 12)

    return await model.users.create({
      email: payload.email,
      password: hashPassword
    })
  }

  async login(payload: usersAttributes) {
    const userExist = await model.users.findByPk(payload.email)

    if (!userExist) throw new AppError('Email is not registered!', 404)

    if (!(await bcrypt.compare(payload.password, userExist.password)))
      throw new AppError('Invalid Password', 403)

    const tokenExpiry =
      payload.rememberme || userExist.rememberme ? '30d' : '1d'

    const accessToken = sign({ email: payload.email }, SECRET_JWT, {
      algorithm: 'HS256',
      expiresIn: tokenExpiry
    })

    await model.users.update(
      {
        token: accessToken,
        rememberme: payload.rememberme
      },
      {
        where: {
          email: payload.email
        }
      }
    )

    const data = {
      email: userExist.email,
      accessToken
    }

    return data
  }
}
