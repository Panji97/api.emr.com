import { Request, Response, NextFunction } from 'express'
import { AppError } from './exception.custom'
import { NODE_ENV } from '../uhuuy.json'

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

    if (NODE_ENV === 'development') {
      sendErrorDev(err, req, res)
    } else if (NODE_ENV === 'production') {
      let error = { ...err }
      error.message = err.message

      // Menangani error spesifik, misal validasi, database error, dll
      if (error.name === 'ValidationError') {
        error = handleValidationErrorDB(error)
      }

      sendErrorProd(error as AppError, req, res)
    }
  }
}

// Contoh fungsi untuk menangani validasi error dari database (misalnya MongoDB)
const handleValidationErrorDB = (err: any): AppError => {
  const message = `Invalid input data: ${Object.values(err.errors)
    .map((el: any) => el.message)
    .join(', ')}`
  return new AppError(message, 400)
}

export { errorHandler, AppError }
