import { NextFunction, Request, Response } from 'express'
import { AuthenticationService } from './auth.service'

export class AuthenticationController {
  private readonly service: AuthenticationService

  constructor() {
    this.service = new AuthenticationService()
  }

  register() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(201).json({
          message: 'success register new user',
          data: await this.service.register(req.body)
        })
      } catch (error) {
        next(error)
      }
    }
  }

  login() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json({
          message: 'success login user',
          data: await this.service.login(req.body)
        })
      } catch (error) {
        next(error)
      }
    }
  }
}
