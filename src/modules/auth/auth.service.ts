import { sign } from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import { SECRET_JWT } from '../../uhuuy.json'
import { model } from '../../models'
import { usersAttributes } from '../../models/users'
import { AppError } from '../../exception/exception.custom'
import { EmailService } from '../../utils/mailer'

export class AuthenticationService {
  private email: EmailService

  constructor() {
    this.email = new EmailService()
  }

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

    return accessToken
  }

  async forgotpassword(payload: usersAttributes) {
    try {
      const userExist = await model.users.findByPk(payload.email)

      if (!userExist) throw new AppError('Email is not registered!', 404)

      const resetToken = crypto.randomBytes(32).toString('hex')
      const resetTokenExpiryTime = new Date()
      resetTokenExpiryTime.setHours(resetTokenExpiryTime.getHours() + 1)

      await model.resetpassword.create({
        email: payload.email,
        tokenresetpassword: resetToken,
        tokenexpirytime: resetTokenExpiryTime
      })

      // await this.mailerService.sendMail({
      //   to: payload.email,
      //   from: 'noreply@yoursupportteam.com',
      //   subject: 'Password Reset Request',
      //   template: './forgot-password.ejs',
      //   context: {
      //     resetLink: `http://localhost:3000/auth/reset-password?token=${resetToken}&email=${payload.email}`
      //   }
      // })

      const result = {
        message: 'success',
        detail: 'Success Request Reset Password, Please check your email!'
      }

      return result
    } catch (error) {
      throw error
    }
  }
}
