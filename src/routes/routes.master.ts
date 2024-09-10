import { Router } from 'express'
import { UserRoutes } from '../modules/master/users/users.routes'
import { MenusRoutes } from '../modules/master/menus/menus.routes'

export class MasterRoutes {
  private router: Router
  private menus: MenusRoutes
  private user: UserRoutes

  constructor() {
    this.router = Router()
    this.menus = new MenusRoutes()
    this.user = new UserRoutes()
  }

  routes(): Router {
    this.router.use('/v1/menus', this.menus.routes())
    this.router.use('/v1/users', this.user.routes())
    return this.router
  }
}
