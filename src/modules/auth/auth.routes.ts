import { Router } from 'express'
import { AuthenticationController } from './auth.controllers'

export class AuthenticationRoutes {
  private readonly router: Router
  private readonly controller: AuthenticationController

  constructor() {
    this.router = Router()
    this.controller = new AuthenticationController()
  }

  routes(): Router {
    this.router.post('/oauth/v1/register', this.controller.register())
    return this.router
  }
}
