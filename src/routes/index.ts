import { Application } from "express"
import AddressRoutes from "./MasterDataRoutes"
import Auth from "../middlewares/Auth"
import { logger } from "../middlewares/Log"

export default class Routes {
  constructor(app: Application) {
    app.use("/MDM/API/v1", AddressRoutes)
  }
}
