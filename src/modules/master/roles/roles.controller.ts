import { Request, Response, NextFunction } from 'express'
import { RoleService } from './roles.service'
import { pgClient } from '../../../config/config.database'

export class RolesController {
  private readonly service: RoleService
  private readonly connection = pgClient.getConnection()

  constructor() {
    this.service = new RoleService()
    this.connection = pgClient.getConnection()
  }

  upsert() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const transaction = await this.connection.transaction()

      try {
        const data = await this.service.upsertRoles(req.body, transaction)

        await transaction.commit()

        return res.status(200).json({
          message: 'success upsert data',
          data
        })
      } catch (error) {
        await transaction.rollback()
        console.log(error)
        next(error)
      }
    }
  }

  findAndCountAll() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json(await this.service.getAllMain(req.query))
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  findAllPermission() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        return res.status(200).json(await this.service.getAllPermission(Number(id)))
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  destroy() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        return res.status(200).json({ data: await this.service.deleteRoles(Number(id)) })
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }
}
