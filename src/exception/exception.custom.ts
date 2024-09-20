export class AppError extends Error {
  public statusCode: number
  public error: string

  constructor(message: string, statusCode: number) {
    super(message)

    this.statusCode = statusCode
    this.error = this.getStatusMessage(statusCode)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, AppError.prototype)
  }

  private getStatusMessage(statusCode: number): string {
    const statusMessages: { [key: number]: string } = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict',
      500: 'Internal Server Error'
    }

    return statusMessages[statusCode] || 'Error'
  }
}
