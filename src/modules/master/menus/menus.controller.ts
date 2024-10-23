import { NextFunction, Request, Response } from 'express'
import { MenusService } from './menus.service'

export class MenusController {
  private readonly service: MenusService

  constructor() {
    this.service = new MenusService()
  }

  upsertParent() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json(await this.service.upsertParentMenu(req.body))
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  getAllParent() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json(await this.service.getAllParent(req.query))
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  deleteParent() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        return res.status(200).json(await this.service.deleteParent(Number(id)))
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  upsertMain() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json(await this.service.upsertMainMenu(req.body))
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  getAllMain() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        return res.status(200).json(await this.service.getAllMain(req.query, Number(id)))
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  deleteMain() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        return res.status(200).json(await this.service.deleteMain(Number(id)))
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  upsertChild() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json(await this.service.upsertChildMenu(req.body))
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  getAllChild() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        return res.status(200).json(await this.service.getAllChild(req.query, Number(id)))
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  deleteChild() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        return res.status(200).json(await this.service.deleteChild(Number(id)))
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  getAllMenus() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json(await this.service.getAllMenus())
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }
}
