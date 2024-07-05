import { Request, Response, NextFunction } from "express"
import jwt, { Secret, GetPublicKeyOrSecret } from "jsonwebtoken"
import { CustomError } from "../utils/errorHandler"
import { CustomRequest } from "../utils/requestHandler"

export default class Auth {
  constructor() {}

  static async auth(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const bearerHeader = req.header("Authorization")
      if (bearerHeader) {
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        const decoded: any = jwt.verify(bearerToken, process.env.SECRET_KEY as Secret)
        req.user = decoded
        next()
      } else {
        throw new CustomError("Unauthorized: Please provide a valid authentication token", 401)
      }
    } catch (error) {
      next(error)
    }
  }
}
