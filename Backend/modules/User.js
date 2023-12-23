const mongosse = require("mongoose")
const joi = require('joi')
const jwt = require("jsonwebtoken")

// user SCHEMA  (Valudation in DB)
const userSchema =new mongosse.Schema(
{
   username:{
         type:String,
         required:true,
         trim:true,
         minlenght: 2,
         maxlength :100
   },
   email:{
      type:String,
      required:true,
      trim:true,
      minlenght: 5,
      maxlength :100,
      unique:true
   },

   password:{
      type:String,
      required:true,
      trim:true,
      minlenght: 8,
   },
   profilePhoto:{
      type:Object,
      default:{
         url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
         publicId:null
      }
   },
   bio:{
      type: String,
   },
   isAdmin:{
      type:Boolean,
      default:false,
   },
   isAccuntVerified:{
      type:Boolean,
      default:false,
   }

},
{
   timestamps:true,
   // for mongoose virtual
   toJSON:{virtuals:true},
   toObject:{virtuals: true}
}
);

// *** Get Posts when we get Profile User 
userSchema.virtual("posts",
{
   ref:"Post", // collection name
   foreignField :'user',
   localField:'_id' //compare _id with user(id)
   })


// Generte Auth Token
userSchema.methods.generateAuthToken=function(){
   return jwt.sign({
      id:this._id,
      isAdmin:this.isAdmin,
   },process.env.JWT_SECRET)
   
}

// user Model
const User =   mongosse.model("User",userSchema)

// valudation  register in Express
function ValidateRegisterUser(obj){
   const schema= joi.object({
      username:joi.string().required().min(2).max(100).trim(),
      email:joi.string().required().min(5).max(100).trim().email(),
      password:joi.string().required().min(8).trim(),
   })

   return schema.validate(obj)
}

// valudation login in Express
function ValidateLoginUser(obj){
   const schema= joi.object({
      email:joi.string().required().min(5).max(100).trim().email(),
      password:joi.string().required().min(8).trim(),
   })

   return schema.validate(obj)
}
// valudation update user
function ValidateUpdateUser(obj){
   const schema= joi.object({
      username:joi.string().min(2).max(100).trim(),
      password:joi.string().min(8).trim(),
      bio:joi.string()
   })

   return schema.validate(obj)
}

// valudation Email
function ValidateEmail(obj){
   const schema= joi.object({
      email:joi.string().required().min(5).max(100).trim().email(),
   })

   return schema.validate(obj)
}

// valudation new password
function ValidateNewPassword(obj){
   const schema= joi.object({
      password:joi.string().required().min(8).trim(),
   })

   return schema.validate(obj)
}


module.exports = {
   User , 
   ValidateRegisterUser,
   ValidateLoginUser,
   ValidateUpdateUser,
   ValidateEmail,
   ValidateNewPassword
}