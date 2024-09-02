import { Router } from 'express'
import { AuthenticationController } from './auth.controllers'
import { AuthenticationValidation } from './auth.validation'

export class AuthenticationRoutes {
  private readonly router: Router
  private readonly controller: AuthenticationController
  private readonly validation: AuthenticationValidation

  constructor() {
    this.router = Router()
    this.controller = new AuthenticationController()
    this.validation = new AuthenticationValidation()
  }

  routes(): Router {
    this.router.post('/oauth/v1/register', this.validation.register(), this.controller.register())
    this.router.post('/oauth/v1/login', this.validation.login(), this.controller.login())
    this.router.post('/oauth/v1/forgot-password', this.validation.forgotpassword(), this.controller.forgotpassword())
    this.router.post('/oauth/v1/reset-password', this.validation.resetpassword(), this.controller.resetpassword())
    return this.router
  }
}
