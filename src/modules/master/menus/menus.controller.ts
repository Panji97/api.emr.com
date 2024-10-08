import { NextFunction, Request, Response } from 'express'
import { MenusService } from './menus.service'

export class MenusController {
  private readonly service: MenusService

  constructor() {
    this.service = new MenusService()
  }

  findAll() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json(await this.service.findAll(req.query))
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  createUserMenu() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json(await this.service.createUserMenu(req.body))
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  userHasMenu() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json(await this.service.userHasMenu(req.user))
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }
}
