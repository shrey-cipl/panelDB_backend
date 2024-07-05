import { Request, Response, NextFunction } from "express"
import { responseHandler } from "../utils/responseHandler"
import MasterDataService from "../services/MasterDataService"

export default class MasterDataController {
  async getAllMasterData(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await MasterDataService.getAllMasterData(req.query)
      return responseHandler(req, res, "GET_DATA", data, true)
    } catch (error) {
      next(error)
    }
  }

  async getBankDetailsByIfscCode(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await MasterDataService.findBankAccountDetailByIfscCode(req.query.ifscCode)
      if (Object.keys(data).length === 0) {
        return responseHandler(req, res, "DATA_NOT_FOUND", data, false)
      }
      return responseHandler(req, res, "GET_DATA", data, true)
    } catch (error) {
      next(error)
    }
  }
}
