import { Router } from 'express'
import { MenusController } from './menus.controller'
import { MenusValidation } from './menus.validation'

export class MenusRoutes {
  private readonly router: Router
  private readonly controller: MenusController
  private readonly validation: MenusValidation

  constructor() {
    this.router = Router()
    this.controller = new MenusController()
    this.validation = new MenusValidation()
  }

  routes(): Router {
    this.router.post('/parent', this.validation.upsertParent(), this.controller.upsertParent())
    this.router.get('/parent', this.controller.getAllParent())
    this.router.delete('/parent/:id', this.controller.deleteParent())
    this.router.post('/main', this.validation.upsertMain(), this.controller.upsertMain())
    this.router.get('/main/:id', this.controller.getAllMain())
    this.router.delete('/main/:id', this.controller.deleteMain())
    this.router.post('/child', this.validation.upsertChild(), this.controller.upsertChild())
    this.router.get('/child/:id', this.controller.getAllChild())
    this.router.delete('/child/:id', this.controller.deleteChild())
    this.router.get('/', this.controller.getAllMenus())
    return this.router
  }
}
