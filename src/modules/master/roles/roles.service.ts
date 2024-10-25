import { AppError } from '../../../exception/exception.custom'
import { model } from '../../../models'
import { ms_rolesAttributes } from '../../../models/ms_roles'
import { paginationInterface } from './roles.interface'
import { roles_has_mparentAttributes } from '../../../models/roles_has_mparent'
import { roles_has_mmainAttributes } from '../../../models/roles_has_mmain'
import { roles_has_mchildAttributes } from '../../../models/roles_has_mchild'

export class RoleService {
  async upsertRoles(payload: any, transaction: any) {
    console.log(payload)

    // Upsert role
    const [role, createdRole] = await model.ms_roles.upsert(
      {
        name: payload.formData.name
      },
      {
        transaction,
        returning: true
      }
    )

    // Hapus semua entry lama di roles_has_mparent, roles_has_mmain, dan roles_has_mchild untuk role_id ini
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

    // Ambil mparent_id unik dari selectedNode
    const mparentIds = Array.from(new Set(Object.keys(payload.selectedNode).map((key) => key.split('-')[0])))

    for (const mparentId of mparentIds) {
      // Insert ke roles_has_mparent
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

      // Dapatkan semua mmain_id yang sesuai dengan mparentId dan pastikan ada digit kedua
      const mmainIds = Array.from(
        new Set(
          Object.keys(payload.selectedNode)
            .filter((key) => key.startsWith(`${mparentId}-`) && key.split('-')[1]) // Pastikan ada digit kedua
            .map((key) => key.split('-')[1]) // Ambil digit kedua sebagai mmainId
        )
      )

      // Insert ke roles_has_mmain untuk setiap mmain_id yang terkait dengan mparent_id saat ini
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

        // Dapatkan semua mchild_id yang sesuai dengan mparentId dan mmainId, pastikan ada digit ketiga
        const mchildIds = Array.from(
          new Set(
            Object.keys(payload.selectedNode)
              .filter((key) => key.startsWith(`${mparentId}-${mmainId}-`) && key.split('-')[2]) // Pastikan ada digit ketiga
              .map((key) => key.split('-')[2]) // Ambil digit ketiga sebagai mchildId
          )
        )

        // Insert ke roles_has_mchild untuk setiap mchild_id yang terkait dengan mparent_id dan mmain_id saat ini
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

  async deleteRoles(id: number) {
    return await model.ms_roles.destroy({
      where: { id }
    })
  }
}
