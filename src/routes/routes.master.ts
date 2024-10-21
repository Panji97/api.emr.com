import { Router } from 'express'
import { UserRoutes } from '../modules/master/users/users.routes'
import { MenusRoutes } from '../modules/master/menus/menus.routes'
import { RolesRoutes } from '../modules/master/roles/roles.routes'

export class MasterRoutes {
  private router: Router
  private menus: MenusRoutes
  private user: UserRoutes
  private roles: RolesRoutes

  constructor() {
    this.router = Router()
    this.menus = new MenusRoutes()
    this.user = new UserRoutes()
    this.roles = new RolesRoutes()
  }

  routes(): Router {
    this.router.use('/v1/menus', this.menus.routes())
    this.router.use('/v1/users', this.user.routes())
    this.router.use('/v1/roles', this.roles.routes())
    return this.router
  }
}
