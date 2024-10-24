import { AppError } from '../../../exception/exception.custom'
import { model } from '../../../models'
import { ms_rolesAttributes } from '../../../models/ms_roles'
import { paginationInterface } from './roles.interface'

export class RoleService {
  async upsertRoles(payload: ms_rolesAttributes) {
    return await model.ms_roles.upsert({
      ...payload
    })
  }

  async getAllMain(payload: paginationInterface) {
    const page = payload.page || 1
    const limit = payload.limit || 20
    const offset = (page - 1) * limit

    const { rows, count } = await model.ms_roles.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']]
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

  async deleteRoles(id: number) {
    return await model.ms_roles.destroy({
      where: { id }
    })
  }

  async upsertRolesHasPermission(transaction: any, payload: any) {
    console.log(payload)
    return 'OK'
  }
}
