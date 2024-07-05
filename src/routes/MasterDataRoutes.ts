import { Router } from "express"
import MasterData from "../controllers/MasterData"

class AddressRoutes {
  router = Router()
  masterData = new MasterData()

  constructor() {
    this.intializeRoutes()
  }
  intializeRoutes() {
    this.router.route("/master_data").get(this.masterData.getAllMasterData)
    this.router.route("/bank_data").get(this.masterData.getBankDetailsByIfscCode)
  }
}
export default new AddressRoutes().router
