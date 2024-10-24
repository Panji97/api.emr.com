import { Router } from 'express'
import { RolesController } from './roles.controller'

export class RolesRoutes {
  private readonly controller: RolesController
  private readonly router: Router

  constructor() {
    this.router = Router()
    this.controller = new RolesController()
  }

  routes(): Router {
    this.router.post('/', this.controller.upsert())
    this.router.post('/permission', this.controller.upsertRolesHasPermission())
    this.router.get('/', this.controller.findAndCountAll())
    this.router.delete('/:id', this.controller.destroy())
    return this.router
  }
}
