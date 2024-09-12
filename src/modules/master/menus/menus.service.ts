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
      data: rows
    }

    return result
  }
}
