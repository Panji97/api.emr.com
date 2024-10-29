import { Router } from 'express'
import { RolesController } from './roles.controller'
import { RolesValidation } from './roles.validation'

export class RolesRoutes {
  private readonly router: Router
  private readonly controller: RolesController
  private readonly validation: RolesValidation

  constructor() {
    this.router = Router()
    this.controller = new RolesController()
    this.validation = new RolesValidation()
  }

  routes(): Router {
    this.router.post('/', this.validation.upsert(), this.controller.upsert())
    this.router.get('/', this.controller.findAndCountAll())
    this.router.get('/permission/:id', this.controller.findAllPermission())
    this.router.delete('/:id', this.controller.destroy())
    return this.router
  }
}
