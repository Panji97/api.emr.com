import { AppError } from '../../../exception/exception.custom'
import { model } from '../../../models'
import { paginationInterface } from './roles.interface'

export class RoleService {
  async upsertRoles(payload: any, transaction: any) {
    const [role, createdRole] = await model.ms_roles.upsert(
      {
        name: payload.formData.name
      },
      {
        transaction,
        returning: true
      }
    )

    await model.roles_has_mparent.destroy({
      where: { role_id: role.id },
      force: true,
      transaction
    })
    await model.roles_has_mmain.destroy({
      where: { role_id: role.id },
      force: true,
      transaction
    })
    await model.roles_has_mchild.destroy({
      where: { role_id: role.id },
      force: true,
      transaction
    })

    const mparentIds = Array.from(new Set(Object.keys(payload.selectedNode).map((key) => key.split('-')[0])))

    for (const mparentId of mparentIds) {
      const roleParent = await model.roles_has_mparent.create(
        {
          role_id: role.id,
          mparent_id: parseInt(mparentId)
        },
        {
          transaction,
          returning: true
        }
      )

      const mmainIds = Array.from(
        new Set(
          Object.keys(payload.selectedNode)
            .filter((key) => key.startsWith(`${mparentId}-`) && key.split('-')[1]) // Pastikan ada digit kedua
            .map((key) => key.split('-')[1]) // Ambil digit kedua sebagai mmainId
        )
      )

      for (const mmainId of mmainIds) {
        const roleMain = await model.roles_has_mmain.create(
          {
            role_id: role.id,
            mmain_id: parseInt(mmainId),
            mparent_id: parseInt(mparentId),
            role_parent_id: roleParent.id
          },
          {
            transaction,
            returning: true
          }
        )

        const mchildIds = Array.from(
          new Set(
            Object.keys(payload.selectedNode)
              .filter((key) => key.startsWith(`${mparentId}-${mmainId}-`) && key.split('-')[2]) // Pastikan ada digit ketiga
              .map((key) => key.split('-')[2]) // Ambil digit ketiga sebagai mchildId
          )
        )

        for (const mchildId of mchildIds) {
          await model.roles_has_mchild.create(
            {
              role_id: role.id,
              mparent_id: parseInt(mparentId),
              mchild_id: parseInt(mchildId),
              mmain_id: parseInt(mmainId),
              role_main_id: roleMain.id,
              role_parent_id: roleParent.id
            },
            {
              transaction,
              returning: true
            }
          )
        }
      }
    }

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

  async getAllPermission(roleId: number) {
    const mparents = await model.roles_has_mparent.findAll({
      where: { role_id: roleId },
      include: [
        {
          model: model.roles_has_mmain,
          as: 'roles_has_mmains',
          required: false,
          include: [
            {
              model: model.roles_has_mchild,
              as: 'roles_has_mchildren',
              required: false
            }
          ]
        }
      ]
    })

    const result = mparents.map((mparent: any) => ({
      mparent_id: mparent.mparent_id,
      roles_has_mmains: mparent.roles_has_mmains.map((mmain: any) => ({
        mmain_id: mmain.mmain_id,
        roles_has_mchildren: mmain.roles_has_mchildren.map((mchild: any) => ({
          mchild_id: mchild.mchild_id
        }))
      }))
    }))

    return result
  }

  async deleteRoles(id: number) {
    return await model.ms_roles.destroy({
      where: { id }
    })
  }
}
