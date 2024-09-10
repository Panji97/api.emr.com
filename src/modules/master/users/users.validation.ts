import { Router } from 'express'

export class UsersRoutes {
  private readonly router: Router

  constructor() {
    this.router = Router()
  }

  routes(): Router {
    return this.router
  }
}
