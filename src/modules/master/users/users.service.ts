import { AppError } from '../../../exception/exception.custom'
import { model } from '../../../models'

export class UserService {
  async findall() {
    const result = await model.users.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'token'] }
    })

    if (!result) throw new AppError('Data not found', 404)

    return result
  }

  async findone(email: string) {
    const user = await model.users.findOne({
      where: { email },
      attributes: ['email', 'username']
    })

    if (!user) throw new AppError('Data not found', 404)

    return user
  }
}
