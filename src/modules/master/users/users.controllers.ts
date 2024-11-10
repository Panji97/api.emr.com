import { NextFunction, Request, Response } from 'express'
import { UserService } from './users.service'
import { JwtPayload } from 'jsonwebtoken'

export class UserController {
  private readonly service: UserService

  constructor() {
    this.service = new UserService()
  }

  findall() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json(await this.service.findall(req.query))
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  findone() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email } = req.params

        return res.status(200).json({
          message: 'success get one data',
          data: await this.service.findone(email)
        })
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  upsertUserHasRole() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json({
          message: 'success upsert data',
          data: await this.service.upsertUserHasRoles(req.body)
        })
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  userRolePermission() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.user as JwtPayload

        return res.status(200).json(await this.service.userRolePermission(Number(id)))
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }
}
