import { AppError } from '../../../exception/exception.custom'
import { model } from '../../../models'
import { paginationInterface } from './users.interface'
import { pgClient } from '../../../config/config.database'

export class UserService {
  private sequelize: any

  constructor() {
    this.sequelize = pgClient.getConnection()
  }

  async findall(payload: paginationInterface) {
    const page = payload.page || 1
    const limit = payload.limit || 5
    const offset = (page - 1) * limit

    const { rows, count } = await model.users.findAndCountAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'password', 'token'] },
      limit,
      offset
    })

    if (!rows) throw new AppError('Data not found', 404)
    const result = {
      pagination: {
        total: count,
        totalpage: Math.ceil(count / limit),
        currentpage: Number(page),
        limit: Number(limit)
      },
      data: rows
    }

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
