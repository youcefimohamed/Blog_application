const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const { User,ValidateEmail,ValidateNewPassword } = require("../modules/User")
const { VerificationToken } = require("../modules/VerificationToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require('crypto')

/**----------------------------------------------------
* @desc Send Reset Password link 
* @router /api/password/reset-password-link
* @method POST
* @access public
-------------------------------------------------------*/

module.exports.sendResetPasswordLink= asyncHandler(async(req,res)=>{
   // 1.valiadtion
   const {error} = ValidateEmail(req.body)
   if(error){
      return res.status(400).json({message : error.details[0].message})
   }
   // 2.get the user from DB by email
   const user = await User.findOne({
      email:req.body.email
   })
   if(!user){
      return  res.status(404).json({message:"user with given email does not exist"})
   }
   // 3.create verification token
   let verificationToken = await VerificationToken.findOne({
      userId:user._id,
   })
   if(!verificationToken){
      verificationToken = new VerificationToken({
         userId:user._id,
         token:crypto.randomBytes(32).toString("hex")
      })
      await verificationToken.save()
   }
   // 4.Creating Link
   const link = `${process.env.CLIENT_DOMAIN}/reset-password/${user._id}/${verificationToken.userId}`
   // 5.Creating Templete html
   const htmlTemplete  = `
      <a href="${link}">Click Here To reset Your Password</a>
   `

   // 6.send Email

   await sendEmail(user.email,"reset Password",htmlTemplete)
   // 7.send response to the client
   res.status(200).json({message:"Password Reset Link sent to your email, please check your inbox"})

})


/**----------------------------------------------------
* @desc Get Reset Password link 
* @router /api/password/reset-password/:userId/:token
* @method GET
* @access public
-------------------------------------------------------*/


module.exports.getResetPasswordLinkCtrl = asyncHandler(async(req,res)=>{
   
   const user = await User.findById(req.params.userId)

   if(!user){
      return  res.status(400).json({message:"invalid link"})
   }
   let verificationToken = await VerificationToken.findOne({
      userId:user._id,
      token : req.params.token
   })
   if(!verificationToken){
      return  res.status(400).json({message:"invalid link"})
   }

   res.status(200).json({message:'Valid Url'})


})


/**----------------------------------------------------
* @desc  Reset Password  
* @router /api/password/reset-password/:userId/:token
* @method POST
* @access public
-------------------------------------------------------*/


module.exports.resetPasswordCtrl = asyncHandler(async(req,res)=>{

    const {error} = ValidateNewPassword(req.body)
    if(error){
       return res.status(400).json({message : error.details[0].message})
    }
    const user = await User.findById(req.params.userId)
    if(!user){
       return  res.status(404).json({message:"invalid Link"})
    }

    const verificationToken = await VerificationToken.findOne({
      userId:user._id,
      token : req.params.token
   })
   if(!verificationToken){
      return  res.status(400).json({message:"invalid link"})
   }

   if(!user.isAccuntVerified){
      user.isAccuntVerified=true;
   }

   const salt =bcrypt.genSalt(10)
   const hashPassword = bcrypt.hash(req.body.password,salt)
   user.password = hashPassword
   await  user.save()
   await VerificationToken.deleteOne(verificationToken)

res.status(200).json({message:"Password Reset Successfully , please Login"})

})