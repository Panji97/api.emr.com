import { AppError } from '../../../exception/exception.custom'
import { model } from '../../../models'
import { paginationInterface } from './users.interface'

export class UserService {
  async findall(payload: paginationInterface) {
    const page = payload.page || 1
    const limit = payload.limit || 5
    const offset = (page - 1) * limit

    const { rows, count } = await model.users.findAndCountAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'password'] },
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

  async userHasMenu(payload: any) {
    const data = await model.users.findByPk(payload.id, {
      include: [
        {
          model: model.user_menu_header,
          as: 'user_menu_headers',
          include: [
            {
              model: model.menus_header,
              as: 'header'
            }
          ]
        },
        {
          model: model.user_menu,
          as: 'user_menus',
          include: [
            {
              model: model.menus,
              as: 'menu'
            }
          ]
        }
      ]
    })

    const result = {
      user_id: data?.id,
      data: data?.user_menu_headers.map((e) => ({
        id: e.header.id,
        key: e.header.id,
        label: e.header.label,
        to: e.header.to_path,
        children: data.user_menus.map((i) => ({
          id: i.menu.id,
          key: `${e.id}-${i.id}`,
          label: i.menu.label,
          icon: i.menu.icon,
          to: i.menu.to_path,
          url: i.menu.url,
          target: i.menu.target,
          badge: i.menu.badge,
          class: i.menu.class,
          preventexact: i.menu.preventexact
        }))
      }))
    }

    return result
  }
}
