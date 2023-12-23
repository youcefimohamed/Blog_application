const mongoose = require('mongoose')


// verification token Schema
const VerificationTokenSchema= new mongoose.Schema({

   userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
   },
   token:{
      type : String ,
      required : true
   }

},
{timestamps: true}
)

// Verification Token model

const VerificationToken = mongoose.model("VerificationToken",VerificationTokenSchema)




module.exports = {
   VerificationToken,
}