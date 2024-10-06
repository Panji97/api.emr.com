import { Router } from 'express'
import { UserController } from './users.controllers'

export class UserRoutes {
  private readonly router: Router
  private readonly controller: UserController

  constructor() {
    this.router = Router()
    this.controller = new UserController()
  }

  routes(): Router {
    this.router.get('/', this.controller.findall())
    this.router.get('/menu', this.controller.userHasMenu())
    this.router.post('/menu', this.controller.upsert())
    return this.router
  }
}
