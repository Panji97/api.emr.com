import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

export class RolesValidation {
  private async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'failed',
        message: errors.array()[0].msg
      })
    }

    next()
  }

  upsert() {
    return [
      body('name')
        .notEmpty()
        .withMessage('Role name is required'),
      this.validate.bind(this)
    ]
  }
}
