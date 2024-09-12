import { Router } from 'express'
import { MenusController } from './menus.controller'

export class MenusRoutes {
  private readonly router: Router
  private readonly controller: MenusController

  constructor() {
    this.router = Router()
    this.controller = new MenusController()
  }

  routes(): Router {
    this.router.get('/', this.controller.findAll())
    this.router.get('/user', this.controller.userHasMenu())
    return this.router
  }
}
