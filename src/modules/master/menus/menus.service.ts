import { AppError } from '../../../exception/exception.custom'
import { model } from '../../../models'
import { paginationInterface } from './menus.interface'
import { user_menu_headerAttributes } from '../../../models/user_menu_header'
import { user_menuAttributes } from '../../../models/user_menu'
import { user_menu_itemAttributes } from '../../../models/user_menu_item'

export class MenusService {
  async findAll(payload: paginationInterface) {
    const page = payload.page || 1
    const limit = payload.limit || 5
    const offset = (page - 1) * limit

    const { rows, count } = await model.menus_header.findAndCountAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: model.menus,
          as: 'menus',
          include: [
            {
              model: model.menus_item,
              as: 'menus_items'
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
      data: rows.map((e) => ({
        id: e.id,
        key: e.id,
        label: e.label,
        to: e.to_path,
        children: e.menus.map((i) => ({
          id: e.id,
          key: `${e.id}-${i.id}`,
          label: i.label,
          icon: i.icon,
          to: i.to_path,
          url: i.url,
          target: i.target,
          badge: i.badge,
          class: i.class,
          preventexact: i.preventexact,
          children: i.menus_items.map((a) => ({
            id: a.id,
            key: `${i.id}-${a.id}`,
            label: a.label,
            icon: a.icon,
            to: a.to_path,
            url: a.url,
            target: a.target
          }))
        }))
      }))
    }

    return result
  }

  async createUserMenu(payload: user_menu_headerAttributes & user_menuAttributes & user_menu_itemAttributes) {
    return await model.user_menu.upsert({
      ...payload
    })
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
