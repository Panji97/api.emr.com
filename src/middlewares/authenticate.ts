import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { AppError } from '../exception/exception.custom'
import { SECRET_JWT } from '../uhuuy.json'

// Menambahkan properti user pada Request secara lokal
declare module 'express-serve-static-core' {
  interface Request {
    user?: string | jwt.JwtPayload // Sesuaikan tipe user berdasarkan payload token
  }
}

export class Authenticate {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      // Ambil token dari header Authorization
      const token = req.headers.authorization?.split(' ')[1]

      if (!token) {
        throw new AppError('Authentication token is missing', 401)
      }

      // Verifikasi token menggunakan secret key
      const decoded = jwt.verify(token, SECRET_JWT as string)

      // Simpan data user yang terdekode ke dalam req.user
      req.user = decoded

      // Lanjut ke middleware berikutnya
      next()
    } catch (error) {
      next(new AppError('Invalid or expired token', 401))
    }
  }
}
