import { Request, Response, NextFunction } from "express"
import { CustomRequest } from "./requestHandler"
import { CustomResponse } from "./responseHandler"

export class CustomError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

// Custom error handling middleware
export const errorHandler = (
  error: CustomError,
  req: CustomRequest,
  res: CustomResponse,
  next: NextFunction
): void => {
  //logger.error(error.message) // Log the error message with Winston
  let statusCode: number = error.statusCode || 500
  if (req.method != "GET") {
    if (req.user) {
      // LogService.updateLogger(res.logger.log_id, error.message, false, req.user.email, statusCode)
    } else {
      // LogService.updateLogger(res.logger.log_id, error.message, false, "", statusCode)
    }
  }
  res.status(statusCode).json({ message: error.message, status: false })
}
