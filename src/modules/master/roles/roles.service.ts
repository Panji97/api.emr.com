import { AppError } from '../../../exception/exception.custom'
import { model } from '../../../models'
import { ms_rolesAttributes } from '../../../models/ms_roles'
import { paginationInterface } from './roles.interface'
import { roles_has_mparentAttributes } from '../../../models/roles_has_mparent'
import { roles_has_mmainAttributes } from '../../../models/roles_has_mmain'
import { roles_has_mchildAttributes } from '../../../models/roles_has_mchild'

export class RoleService {
  async upsertRoles(
    payload: ms_rolesAttributes & roles_has_mparentAttributes & roles_has_mmainAttributes & roles_has_mchildAttributes,
    transaction: any
  ) {
    // const [role, createdRole] = await model.ms_roles.upsert(
    //   {
    //     ...payload
    //   },
    //   {
    //     transaction,
    //     returning: true
    //   }
    // )

    // const [mparent, createdMparent] = await model.roles_has_mparent.upsert(
    //   {
    //     ...payload,
    //     role_id: role.id
    //   },
    //   {
    //     transaction,
    //     returning: true
    //   }
    // )

    return
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
}
