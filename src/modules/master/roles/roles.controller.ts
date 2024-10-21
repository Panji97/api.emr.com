import { Request, Response, NextFunction } from 'express'
import { RoleService } from './roles.service'

export class RolesController {
  private readonly service: RoleService

  constructor() {
    this.service = new RoleService()
  }

  upsert() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json({
          message: 'success upsert data',
          data: await this.service.upsertRoles(req.body)
        })
      } catch (error) {
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
