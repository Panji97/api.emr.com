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
      body('formData.name')
        .notEmpty()
        .withMessage('Role name is required'),
      body('selectedNode').custom((value) => {
        if (value === null) {
          throw new Error('Menu selected is required')
        }

        return true
      }),
      this.validate.bind(this)
    ]
  }
}
