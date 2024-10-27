import { AppError } from '../../../exception/exception.custom'
import { model } from '../../../models'
import { paginationInterface } from './menus.interface'
import { ms_mparentAttributes } from '../../../models/ms_mparent'
import { ms_mmainAttributes } from '../../../models/ms_mmain'
import { ms_mchildAttributes } from '../../../models/ms_mchild'

export class MenusService {
  async upsertParentMenu(payload: ms_mparentAttributes) {
    return await model.ms_mparent.upsert({
      ...payload
    })
  }

  async getAllParent(payload: paginationInterface) {
    const page = payload.page || 1
    const limit = payload.limit || 5
    const offset = (page - 1) * limit

    const { rows, count } = await model.ms_mparent.findAndCountAll({
      limit,
      offset
    })

    if (!rows) throw new AppError('Data not found', 404)

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

  async deleteParent(id: number) {
    const data = await model.ms_mparent.findByPk(id)

    if (!data) throw new AppError('Data not found', 404)

    return await model.ms_mparent.destroy({
      where: { id }
    })
  }

  async upsertMainMenu(payload: ms_mmainAttributes) {
    return await model.ms_mmain.upsert({
      ...payload
    })
  }

  async getAllMain(payload: paginationInterface, id: number) {
    const page = payload.page || 1
    const limit = payload.limit || 20
    const offset = (page - 1) * limit

    const { rows, count } = await model.ms_mmain.findAndCountAll({
      where: {
        header_id: id
      },
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

  async deleteMain(id: number) {
    const data = await model.ms_mmain.findByPk(id)

    if (!data) throw new AppError('Data not found', 404)

    return await model.ms_mmain.destroy({
      where: { id }
    })
  }

  async upsertChildMenu(payload: ms_mchildAttributes) {
    return await model.ms_mchild.upsert({
      ...payload
    })
  }

  async getAllChild(payload: paginationInterface, id: number) {
    const page = payload.page || 1
    const limit = payload.limit || 20
    const offset = (page - 1) * limit

    const { rows, count } = await model.ms_mchild.findAndCountAll({
      where: {
        menu_id: id
      },
      limit,
      offset
    })

    if (!rows) throw new AppError('Data not found', 404)

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

  async deleteChild(id: number) {
    const data = await model.ms_mchild.findByPk(id)

    if (!data) throw new AppError('Data not found', 404)

    return await model.ms_mchild.destroy({
      where: { id }
    })
  }

  async getAllMenus() {
    const rows = await model.ms_mparent.findAll({
      include: [
        {
          model: model.ms_mmain,
          as: 'ms_mmains',
          include: [
            {
              model: model.ms_mchild,
              as: 'ms_mchildren'
            }
          ]
        }
      ]
    })

    if (!rows) throw new AppError('Data not found', 404)

    const result = {
      data: rows.map((e) => ({
        key: `${e.id}`,
        data: {
          name: e.label,
          path: e.to_path
        },
        children: e.ms_mmains.map((i) => ({
          key: `${e.id}-${i.id}`,
          data: {
            name: i.label,
            path: i.to_path
          },
          children: i.ms_mchildren.map((o) => ({
            key: `${e.id}-${i.id}-${o.id}`,
            data: {
              name: o.label,
              path: o.to_path
            }
          }))
        }))
      }))
    }

    return result
  }
}
