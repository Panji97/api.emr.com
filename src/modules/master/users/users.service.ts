import { AppError } from '../../../exception/exception.custom'
import { model } from '../../../models'
import { paginationInterface } from './users.interface'
import { user_has_rolesAttributes } from '../../../models/user_has_roles'

export class UserService {
  async findall(payload: paginationInterface) {
    const page = payload.page || 1
    const limit = payload.limit || 5
    const offset = (page - 1) * limit

    const { rows, count } = await model.users.findAndCountAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'password', 'token'] },
      include: [
        {
          model: model.user_has_roles,
          as: 'user_has_role',
          attributes: ['id'],
          include: [
            {
              model: model.ms_roles,
              as: 'role',
              attributes: ['id', 'name']
            }
          ]
        }
      ],
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

  async upsertUserHasRoles(payload: user_has_rolesAttributes) {
    return await model.user_has_roles.upsert({
      ...payload
    })
  }

  async userRolePermission(userId: number) {
    const dataUserRole = await model.users.findByPk(userId, {
      attributes: [],
      include: [
        {
          model: model.user_has_roles,
          as: 'user_has_role',
          attributes: ['role_id']
        }
      ]
    })

    const dataMenus = await model.roles_has_mparent.findAll({
      attributes: [],
      where: {
        role_id: dataUserRole?.user_has_role.role_id
      },
      include: [
        {
          model: model.ms_mparent,
          as: 'mparent'
        },
        {
          model: model.roles_has_mmain,
          as: 'roles_has_mmains',
          include: [
            {
              model: model.ms_mmain,
              as: 'mmain'
            },
            {
              model: model.roles_has_mchild,
              as: 'roles_has_mchildren',
              include: [
                {
                  model: model.ms_mchild,
                  as: 'mchild'
                }
              ]
            }
          ]
        }
      ]
    })

    return dataMenus.map((e) => ({
      label: e.mparent.label,
      items: e.roles_has_mmains.map((o) => ({
        label: o.mmain.label,
        icon: o.mmain.icon,
        to: o.mmain.to_path,
        items:
          o.roles_has_mchildren.length > 0
            ? o.roles_has_mchildren.map((i) => ({
                label: i.mchild.label,
                icon: i.mchild.icon,
                to: i.mchild.to_path
              }))
            : null
      }))
    }))
  }
}
