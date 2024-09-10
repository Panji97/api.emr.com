import { model } from '../../../models'

export class MenusService {
  async findAll() {
    const { rows, count } = await model.menus.findAndCountAll({
      include: [
        {
          model: model.items,
          as: 'items',
          order: [['menu_id', 'ASC']]
        }
      ],
      order: [['id', 'ASC']]
    })

    return rows
  }
}
