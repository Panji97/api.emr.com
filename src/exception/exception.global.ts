import { Request, Response, NextFunction } from 'express'
import { AppError } from './exception.custom'
import { NODE_ENV } from '../uhuuy.json'

const handleForeignKeyConstraintError = (err: any): AppError => {
  return new AppError(`Cannot delete or update because there are related records`, 400)
}

// Error handler untuk development mode
const sendErrorDev = (err: AppError, req: Request, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err
  })
}

// Error handler untuk production mode
const sendErrorProd = (err: AppError, req: Request, res: Response): void => {
  // Jika error-nya adalah operational, kirimkan pesan yang aman untuk user
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  } else {
    // Jika error tidak terduga, sembunyikan detailnya
    console.error('ERROR 💥:', err)
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    })
  }
}

// Higher-order function untuk error handler
const errorHandler = () => {
  return (err: AppError, req: Request, res: Response, next: NextFunction): void => {
    // Tetapkan status code default jika tidak ada
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
