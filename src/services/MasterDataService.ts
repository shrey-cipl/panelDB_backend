import mongoose from "mongoose"

export default class MasterDataService {
  static async getAllMasterData(data: any): Promise<any> {
    const db = mongoose.connection.db // Get the native MongoDB driver database object
    const collection = db.collection("MDM_Masters")
    let query = {}
    if (data.countryId) {
      query = { "data.countryId": parseInt(data.countryId) }
    }
    if (data.stateId) {
      query = { "data.stateId": parseInt(data.stateId) }
    }
    if (data.bankId) {
      query = { "data.bankId": parseInt(data.bankId) }
    }
    if (data.districtId) {
      query = { "data.districtId": parseInt(data.districtId) }
    }
    const docs = await collection
      .aggregate([
        { $match: { masterId: parseInt(data.masterId) } },
        { $unwind: "$data" },
        {
          $match: query
        },
        {
          $group: {
            _id: "$_id",
            masterId: { $first: "$masterId" },
            masterName: { $first: "$masterName" },
            data: { $push: "$data" }
          }
        }
      ])
      .toArray()

    return docs
  }

  static async findBankAccountDetailByIfscCode(ifscCode: any) {
    const db = mongoose.connection.db
    let branch: any = await db
      .collection("MDM_Masters")
      .aggregate([
        { $match: { masterId: 6 } },
        { $unwind: "$data" },
        { $match: { "data.branchIfscCode": ifscCode, "data.isActive": "Y" } },
        {
          $project: {
            _id: 0,
            "data.bankBranchId": 1,
            "data.bankId": 1,
            "data.bankBranchNameEn": 1,
            "data.branchIfscCode": 1
          }
        }
      ])
      .toArray()
    branch = branch.length > 0 ? branch[0].data : {}
    let bank = await db
      .collection("MDM_Masters")
      .aggregate([
        { $match: { masterId: 5 } },
        { $unwind: "$data" },
        { $match: { "data.bankId": branch.bankId, "data.isActive": "Y" } },
        {
          $project: {
            _id: 0,
            "data.bankId": 1,
            "data.bankNameEn": 1
          }
        }
      ])
      .toArray()
    bank = bank.length > 0 ? bank[0].data : {}
    return { ...branch, ...bank }
  }
}
