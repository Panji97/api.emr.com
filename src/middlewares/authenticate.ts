import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { header, validationResult } from 'express-validator'
import { AppError } from '../exception/exception.custom'

export class Authenticate {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    //
  }
}
