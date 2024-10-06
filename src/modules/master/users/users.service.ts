import { AppError } from '../../../exception/exception.custom'
import { model } from '../../../models'
import { paginationInterface } from './users.interface'
import { user_menuAttributes } from '../../../models/user_menu'
import { user_menu_itemAttributes } from '../../../models/user_menu_item'
import { user_menu_header } from '../../../models/user_menu_header'
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

  async upsertUserPermission(payload: user_menuAttributes & user_menu_itemAttributes & user_menu_header) {
    const transaction = await this.sequelize.transaction()

    await model.user_menu_header.upsert(
      {
        ...payload
      },
      { transaction }
    )

    if (payload.menu_id)
      await model.user_menu.upsert(
        {
          ...payload
        },
        { transaction }
      )

    if (payload.item_id)
      await model.user_menu_item.upsert(
        {
          ...payload
        },
        { transaction }
      )

    return
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
