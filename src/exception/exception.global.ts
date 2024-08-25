import { Request, Response, NextFunction } from 'express'
import { AppError } from './exception.custom'

export const errorHandler = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
        error: err.error,
        statusCode: err.statusCode
      })
    }

    // Default to 500 server error
    res.status(500).json({
      message: 'Something went wrong!',
      error: 'Internal Server Error',
      statusCode: 500
    })
  }
}
