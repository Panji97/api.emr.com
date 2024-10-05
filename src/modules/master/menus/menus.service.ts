import { AppError } from '../../../exception/exception.custom'
import { model } from '../../../models'
import { paginationInterface } from './menus.interface'

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

  async userHasMenus(payload: paginationInterface, user: any) {
    const page = payload.page || 1
    const limit = payload.limit || 5
    const offset = (page - 1) * limit

    const { rows, count } = await model.user_menus_header.findAndCountAll({
      attributes: [],
      where: {
        user_id: user.id
      },
      include: [
        {
          model: model.menus_header,
          as: 'menus_header',
          attributes: { exclude: ['id'] }
        },
        {
          model: model.user_menus,
          as: 'user_menus',
          attributes: ['menus_id'],
          include: [
            {
              model: model.menus,
              as: 'menu',
              attributes: { exclude: ['id', 'header_id'] }
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
}
