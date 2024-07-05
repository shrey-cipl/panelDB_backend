// dbConnection.ts
import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const mongodbUri = process.env.MONGODB_URI
    if (!mongodbUri) {
      throw new Error("MONGODB_URI is not defined in the environment variables.")
    }

    await mongoose.connect(mongodbUri)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    process.exit(1) // Exit the process if unable to connect
  }
}

export default connectDB
