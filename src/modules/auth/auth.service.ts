import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import { sign } from 'jsonwebtoken'
import { model } from '../../models'
import { SECRET_JWT, WHITE_LIST } from '../../uhuuy.json'
import { usersAttributes } from '../../models/users'
import { EmailService } from '../../utils/nodemailer'
import { AppError } from '../../exception/exception.custom'
import { resetpasswordAttributes } from '../../models/resetpassword'
import { Op } from 'sequelize'

export class AuthenticationService {
  private email: EmailService

  constructor() {
    this.email = new EmailService()
  }

  async register(payload: usersAttributes) {
    const userExist = await model.users.findOne({ where: { email: payload.email } })

    if (userExist) throw new AppError('Email already exist', 409)

    const hashPassword = await bcrypt.hash(payload.password, 12)

    const userCreated = await model.users.create(
      {
        email: payload.email,
        password: hashPassword
      },
      {
        returning: true
      }
    )

    const checkRoles = await model.ms_roles.findOne({
      where: {
        name: {
          [Op.like]: `USER`
        }
      },
      raw: true
    })

    if (!checkRoles) throw new AppError('Role default is not found', 404)

    return await model.user_has_roles.create({
      user_id: userCreated.id,
      role_id: checkRoles.id
    })
  }

  async login(payload: usersAttributes) {
    const userExist = await model.users.findOne({ where: { email: payload.email } })

    if (!userExist) throw new AppError('Email is not registered!', 404)

    if (!(await bcrypt.compare(payload.password, userExist.password))) throw new AppError('Invalid Password', 403)

    const tokenExpiry = payload.rememberme || userExist.rememberme ? '30d' : '1d'

    const accessToken = sign({ email: payload.email, id: userExist.id }, SECRET_JWT, {
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
    const userExist = await model.users.findOne({ where: { email: payload.email } })

    if (!userExist) throw new AppError('Email is not registered!', 404)

    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiryTime = new Date(Date.now() + 3600000)

    await model.resetpassword.create({
      email: payload.email,
      tokenresetpassword: resetToken,
      tokenexpirytime: resetTokenExpiryTime
    })

    return this.email.sendMail(payload.email, 'Reset Password Request', 'reset-password', {
      resetLink: `${WHITE_LIST}/auth/reset-password?tokenresetpassword=${resetToken}&email=${payload.email}`
    })
  }

  async resetpassword(payload: resetpasswordAttributes & { password: string }) {
    const { password, ...resetPayload } = payload

    const resetRequest = await model.resetpassword.findOne({
      where: {
        email: resetPayload.email,
        tokenresetpassword: resetPayload.tokenresetpassword
      }
    })

    if (!resetRequest) throw new AppError('Invalid token or email', 401)

    if (resetRequest.tokenexpirytime > new Date()) throw new AppError('Token has expired', 410)

    const userExist = await model.users.findOne({ where: { email: resetPayload.email } })

    if (!userExist) throw new AppError('User not found', 404)

    const hashPassword = await bcrypt.hash(password, 12)

    await model.users.update({ password: hashPassword }, { where: { email: resetPayload.email } })

    return await model.resetpassword.destroy({
      where: {
        email: resetPayload.email,
        tokenresetpassword: resetPayload.tokenresetpassword
      }
    })
  }
}
