import { Request, Response, NextFunction } from "express"
export interface CustomRequest extends Request {
  user?: any
}
