import { NextFunction, Request, Response } from 'express'
import { UserService } from './users.service'

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
        next(error)
      }
    }
  }
}
