import { Request, Response, NextFunction } from 'express'
import { AppError } from './exception.custom'
import { NODE_ENV } from '../uhuuy.json'

const handleForeignKeyConstraintError = (err: any): AppError => {
  return new AppError(`Cannot delete or update because there are related records`, 400)
}

const sendErrorDev = (err: AppError, req: Request, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err
  })
}

const sendErrorProd = (err: AppError, req: Request, res: Response): void => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  } else {
    console.error('ERROR 💥:', err)
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    })
  }
}

const errorHandler = () => {
  return (err: AppError, req: Request, res: Response, next: NextFunction): void => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    let error = { ...err }
    err.message = err.message

    if (error.name === 'SequelizeForeignKeyConstraintError') error = handleForeignKeyConstraintError(error)

    if (/development/i.test(NODE_ENV)) {
      sendErrorDev(error as AppError, req, res)
    } else if (/production/i.test(NODE_ENV)) {
      sendErrorProd(error as AppError, req, res)
    }
  }
}

export { errorHandler, AppError }
