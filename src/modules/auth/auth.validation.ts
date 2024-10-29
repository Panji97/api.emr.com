import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

export class AuthenticationValidation {
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

  register() {
    return [
      body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be valid format'),

      body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage(
          'Password must be at least 8 characters long'
        )
        .matches(/[A-Z]/)
        .withMessage(
          'Password must contain at least one uppercase letter'
        )
        .matches(/[a-z]/)
        .withMessage(
          'Password must contain at least one lowercase letter'
        )
        .matches(/\d/)
        .withMessage(
          'Password must contain at least one number'
        )
        .matches(/[@$!%*?&#^()]/)
        .withMessage(
          'Password must contain at least one special character (@, $, !, %, *, ?, &, #, ^, ())'
        )
        .not()
        .isIn(['12345678', 'password', 'qwerty', 'abcdefg'])
        .withMessage(
          'Do not use a common, easily guessable password'
        ),
      this.validate.bind(this)
    ]
  }

  login() {
    return [
      body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be valid format'),
      body('password')
        .notEmpty()
        .withMessage('Password is required'),
      this.validate.bind(this)
    ]
  }

  forgotpassword() {
    return [
      body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be valid format'),
      this.validate.bind(this)
    ]
  }

  resetpassword() {
    return [
      body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage(
          'Password must be at least 8 characters long'
        )
        .matches(/[A-Z]/)
        .withMessage(
          'Password must contain at least one uppercase letter'
        )
        .matches(/[a-z]/)
        .withMessage(
          'Password must contain at least one lowercase letter'
        )
        .matches(/\d/)
        .withMessage(
          'Password must contain at least one number'
        )
        .matches(/[@$!%*?&#^()]/)
        .withMessage(
          'Password must contain at least one special character (@, $, !, %, *, ?, &, #, ^, ())'
        )
        .not()
        .isIn(['12345678', 'password', 'qwerty', 'abcdefg'])
        .withMessage(
          'Do not use a common, easily guessable password'
        ),
      body('tokenresetpassword')
        .notEmpty()
        .withMessage('Token reset password is required'),
      body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be valid'),
      this.validate.bind(this)
    ]
  }
}
