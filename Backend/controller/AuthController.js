const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const joi = require('joi')
const { User, ValidateRegisterUser, ValidateLoginUser } = require("../modules/User")
const { VerificationToken } = require("../modules/VerificationToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require('crypto')

/**----------------------------------------------------
* @desc Registre New User 
* @router /api/auth/register
* @method POST
* @access public
-------------------------------------------------------*/

module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
   // validation
   const { error } = ValidateRegisterUser(req.body)
   if (error) {
      return res.status(400).json({ message: error.details[0].message })
   }

   // is user already exists
   let user = await User.findOne({ email: req.body.email });
   if (user) {
      return res.status(400).json({ message: 'User Already Exist' })
   }

   // hash the Password
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(req.body.password, salt)

   user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,

   })
   // new user and saved in DB
   await user.save()

   // creating new verificationToken and save it To db
   const verificationToken = new VerificationToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
   })
   await verificationToken.save()
   // making the link
   const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`

   // putting the link into an html templete
   const htmlTemplete = `
   <div>
   <p>Click in the Link below to verify your email</p>
   <a href="${link}">Verify</a>
   </div>
`
   // sending email to user

   await sendEmail(user.email, "Verify your Email", htmlTemplete)

   // send a Response to client
   res.status(201).json({ message: "We send to you an email , please verify your email address" })


})


/**----------------------------------------------------
* @desc Login User
* @router /api/auth/login
* @method POST
* @access public
-------------------------------------------------------*/
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
   // valudation
   const { error } = ValidateLoginUser(req.body)
   if (error) {
      return res.status(400).json({ message: error.details[0].message })
   }
   // if email exist in DB
   const user = await User.findOne({ email: req.body.email })
   if (!user) {
      return res.status(400).json({ message: "invalid email or password" })
   }
   // check the Password
   const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
   if (!isPasswordMatch) {
      return res.status(400).json({ message: "invalid email or password" })
   }

   //   sending email (verifey account if not verified)
   if (!user.isAccuntVerified) {

      let verificationToken = await VerificationToken.findOne({
         userId: user._id
      })
      if (!verificationToken) {
         verificationToken = new VerificationToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
         })
         await verificationToken.save()
      }

      const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`

      const htmlTemplete = `
      <div>
      <p>Click in the Link below to verify your email</p>
      <a href="${link}">Verify</a>
      </div>
   `
      await sendEmail(user.email, "Verify your Email", htmlTemplete)

      // send a Response to client
      return res.status(400).json({ message: "We send to you an email , please verify your email address" })

   }

   // JWT
   const token = user.generateAuthToken()
   // response
   res.status(200).json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
      profilePhoto: user.profilePhoto,
      token: token
   })

})


/**----------------------------------------------------
* @desc Verify User Account
* @router /api/auth/:userId/verify/:token
* @method Get
* @access public
-------------------------------------------------------*/

module.exports.verifyUserAccountCtrl = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.userId)
   if (!user) {
      return res.status(400).json({ message: "Invalid link" })
   }

   const verificationToken = await VerificationToken.findOne({
      userId: user._id,
      token: req.params.token
   })

   if (!verificationToken) {
      return res.status(400).json({ message: "Invalid link" })
   }
   user.isAccuntVerified=true;

   await user.save()

   await VerificationToken.deleteOne(verificationToken);

   res.status(200).json({ message: "your Account Verified" })

})