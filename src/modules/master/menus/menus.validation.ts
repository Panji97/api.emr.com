import { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'

export class MenusValidation {
  private async validate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'failed',
        message: errors.array()[0].msg
      })
    }

    next()
  }

  upsertParent() {
    return [body('label').notEmpty().withMessage('Label is required'), this.validate.bind(this)]
  }

  upsertMain() {
    return [
      body('header_id').notEmpty().withMessage('Header id is required'),
      body('label').notEmpty().withMessage('Label is required'),
      body('to_path').notEmpty().withMessage('Path to is required'),
      this.validate.bind(this)
    ]
  }

  upsertChild() {
    return [
      body('menu_id').notEmpty().withMessage('Menu id is required'),
      body('label').notEmpty().withMessage('Label is required'),
      body('to_path').notEmpty().withMessage('Path to is required'),
      this.validate.bind(this)
    ]
  }
}
