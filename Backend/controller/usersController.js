const asyncHandler = require("express-async-handler")
const {User, ValidateUpdateUser} = require('../modules/User')
const {cloudinaryRemoveImage,cloudinaryUploadImage,cloudinaryRemoveManyImages} =require("../utils/cloudinary")
const path = require('path')
const fs = require("fs")
const  bcrypt= require("bcryptjs")
const  {Post} = require("../modules/Post")
const  {Comment} = require("../modules/Comment")
/**----------------------------------------------------
* @desc Get All users Profile
* @router /api/users/profile
* @method GET
* @access private
-------------------------------------------------------*/

module.exports.getAllUsersCtrl = asyncHandler(async(req,res)=>{   
      const users = await User.find().select("-password").populate('posts');;
      res.status(200).json(users)
})



/**----------------------------------------------------
* @desc Get  user Profile
* @router /api/users/profile/:id
* @method GET
* @access public
-------------------------------------------------------*/

module.exports.getUserProfilCtrl = asyncHandler(async(req,res)=>{

   const user = await User.findById(req.params.id).select("-password").populate('posts');
   if(!user){
      return res.status(404).json({message:'User not found'})
   }
   res.status(200).json(user)
})


/**----------------------------------------------------
* @desc Update  user Profile
* @router /api/users/profile/:id
* @method PUT
* @access private (only user himself)
-------------------------------------------------------*/

module.exports.updateUserProfilCtrl = asyncHandler(async(req,res)=>{

   const {error} =ValidateUpdateUser(req.body)
   if(error){
      return res.status(400).json({message:error.details[0].message})
   }
   if(req.body.password){
      const salt = await bcrypt.genSalt(10)
      req.body.password= await bcrypt.hash(req.body.password,salt)
   }
   const updatedUser = await User.findByIdAndUpdate(req.params.id,{
      $set: {
            username:req.body.username,
            password:req.body.password,
            bio:req.body.bio
      }
   },{new:true}).select("-password").populate("posts")
   res.status(200).json(updatedUser)
})



/**----------------------------------------------------
* @desc Get  users count
* @router /api/users/count
* @method GET
* @access private
-------------------------------------------------------*/

module.exports.getUsersCountCtrl = asyncHandler(async(req,res)=>{   
   const count = await User.count()
   res.status(200).json(count)
})



/**----------------------------------------------------
* @desc Profil Photo Upload
* @router /api/users/profile/profile-photo-upload
* @method Post
* @access private (only logged in user )
-------------------------------------------------------*/

module.exports.profilePhotoUploadCtrl =  asyncHandler(async(req,res)=>{
   // 1-Validation
   if(!req.file){
      return res.status(400).json({message : "no file Provided"})
   }

   // 2-Get the Path to the image
   const imagePath = path.join(__dirname,`../images/${req.file.filename}`)
   // 3-Upload to cloudinary
   const result = await cloudinaryUploadImage(imagePath)
   // 4-Get the User Form DB
   const user = await User.findById(req.user.id)
   // 5-Delete the older photo if existe

   if(user.profilePhoto.publicId !== null){
      await cloudinaryRemoveImage(user.profilePhoto.publicId)
   }
   // 6-change the profilePhoto field in Db
   user.profilePhoto={
      url:result.secure_url,
      publicId:result.public_id,
   }

   await user.save();
   // 7-Send Response to client
   res.status(200).json(
      {
         message:"your profile photo uploaded successfully!",
         profilePhoto:{
            url :result.secure_url,
            publicId:result.public_id
         }
      })
   // 8-Remove image form server
   fs.unlinkSync(imagePath);
})


/**----------------------------------------------------
* @desc delete  user profile(account)
* @router /api/users/profile/:id
* @method DELETE
* @access private (only admin or User Himself)
-------------------------------------------------------*/

module.exports.deleteUserProfileCtrl =asyncHandler(async (req,res)=>{
   // 1-get the user from DB
   const user = await User.findById(req.params.id)
   if(!user){
      return res.status(404).json({message:'User not Found'})
   }
   // 2-get all Post From DB

   const posts = await Post.find({user:user._id})

   // 3-get the Public ids from the Posts
   const publicIds = posts?.map((post)=>post.image.publicId)

   // 4-delete all posts image from cloudinary
   if(publicIds?.length>0){
      await cloudinaryRemoveManyImages(publicIds)
   }
   // 5-delete the profile Picture form cloudinary
   if(user.profilePhoto.publicId !== null){
      await cloudinaryRemoveImage(user.profilePhoto.publicId)
   }

   //  6-delete user post and comments
      await Post.deleteMany({user : user._id})
      await Comment.deleteMany({user:user._id})

   // 7-delete user himSelf
   await User.findByIdAndDelete(req.params.id)
   // 8-send a response the client
   res.status(200).json({message:'Your porfile has been Deleted!'})
})