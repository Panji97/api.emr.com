import { Request, Response, Router } from 'express'
import { AuthenticationRoutes } from '../modules/auth/auth.routes'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  return res.json({ status: true, date: new Date(), result: 'REST API EMR (Legacy)' })
})
router.use('/o', new AuthenticationRoutes().routes())

export { router }
