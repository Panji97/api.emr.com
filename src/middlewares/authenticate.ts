import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { AppError } from '../exception/exception.custom'
import { SECRET_JWT } from '../uhuuy.json'

declare module 'express-serve-static-core' {
  interface Request {
    user?: string | jwt.JwtPayload
  }
}

export class Authenticate {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1]

      if (!token) return next(new AppError('Authentication token is missing', 401))

      const decoded = jwt.verify(token, SECRET_JWT as string)

      req.user = decoded

      next()
    } catch (error) {
      next(new AppError('Invalid or expired token', 401))
    }
  }
}
