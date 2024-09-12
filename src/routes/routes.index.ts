import { Request, Response, Router } from 'express'
import { Authenticate } from '../middlewares/authenticate'
import { AuthenticationRoutes } from '../modules/auth/auth.routes'
import { MasterRoutes } from './routes.master'

const indexRouter = () => {
  const router = Router()

  router.get('/', (req: Request, res: Response) => {
    return res.json({ status: true, date: new Date(), result: 'REST API EMR (Legacy)' })
  })

  router.use('/o', new AuthenticationRoutes().routes())
  router.use('/master', new Authenticate().verifyToken, new MasterRoutes().routes())

  return router
}

export { indexRouter }
