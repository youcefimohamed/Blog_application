const mongosse = require("mongoose")

module.exports  = async()=>{
   try {
      await mongosse.connect(process.env.MONGO_URI)
      console.log("Connected to MongoDB!")
   } catch (error) {
      console.log("Connected Failed To MongoDB!")
   }
}