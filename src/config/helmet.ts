import { RequestHandler } from 'express'
import helmet from 'helmet'

export const helmetHandler = (): RequestHandler => {
  return helmet()
}
