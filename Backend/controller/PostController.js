const fs = require("fs")
const path = require('path')
const asyncHandler = require("express-async-handler")
const {Post,validateCreatePost, validateUpdatePost} =require("../modules/Post")
const {User} = require('../modules/User')
const {cloudinaryRemoveImage,cloudinaryUploadImage} =require("../utils/cloudinary")
const {Comment}  =require("../modules/Comment")



/**----------------------------------------------------
* @desc Create New Post
* @router /api/posts
* @method POST
* @access private (only login user )
-------------------------------------------------------*/

module.exports.createNewPostCtrl = asyncHandler(async(req,res)=>{
   // 1-validation for image
   if(!req.file){
      return res.status(400).json({message:"No Image Provided"})
   }
   // 2-validation for data
   const {error}  =validateCreatePost(req.body);
   if(error) {
      return res.status(400).json({message:error.details[0].message})
   }

   // 3-Upload Photo
   const imagePath = path.join(__dirname,`../images/${req.file.filename}`)
   const result =await cloudinaryUploadImage(imagePath)
   // 4-create new post and save it to DB
   const post = new Post({
      title : req.body.title,
      description : req.body.description,
      category : req.body.category,
      user:req.user.id,
      image:{
         url:result.secure_url,
         publicId:result.public_id
      }
   })
   await post.save()
   // 5-Send response to client
   res.status(201).json(post)
   // 6-Remove image from the server
   fs.unlinkSync(imagePath)
})



/**----------------------------------------------------
* @desc Get All Post
* @router /api/posts
* @method GET
* @access public
-------------------------------------------------------*/

module.exports.getAllPostCtrl = asyncHandler(async(req,res)=>{
   const POST_PER_PAGE = 3;
   const {pageNumber,category} = req.query;
   let posts ;
   if(pageNumber){
      posts = await Post.find()
      .skip((pageNumber-1)*POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .sort({createdAt:-1})
      .populate("user",["-password"])
   }else if(category){
      posts= await Post.find({category:category})
      .sort({createdAt:-1})
      .populate("user",["-password"])
   }else{
      posts = await Post.find().sort({createdAt:-1})
      .populate("user",["-password"])

   }
   res.status(200).json(posts)
})



/**----------------------------------------------------
* @desc Get Single Post
* @router /api/posts/:id
* @method Get
* @access public
-------------------------------------------------------*/

module.exports.getSinglePostCtrl = asyncHandler(async(req,res)=>{
   const post = await Post.findById(req.params.id)
   .populate("user",["-password"])
   .populate("comments")
   if(!post){
      return res.status(404).json({message:"Post not Found"})
   }
   
   res.status(200).json(post)
})


/**----------------------------------------------------
* @desc Get Posts Count
* @router /api/posts/count
* @method Get
* @access public
-------------------------------------------------------*/

module.exports.getCountPostsCtrl = asyncHandler(async(req,res)=>{
   const countPost = await Post.count()
   res.status(200).json(countPost)
})

/**----------------------------------------------------
* @desc Delete Post 
* @router /api/posts/:id
* @method DELETE
* @access private (only admin or owner of the Post(user himself))
-------------------------------------------------------*/

module.exports.deletePostCtrl = asyncHandler(async(req,res)=>{
   const post = await Post.findById(req.params.id)
   if(!post){
      return res.status(404).json({message:"Post not Found"})
   }
   if(req.user.isAdmin||req.user.id === post.user.toString()){
      await Post.findByIdAndDelete(req.params.id);
      await cloudinaryRemoveImage(post.image.publicId)

      // Delete All Comments that being to this post
      await Comment.deleteMany({postId:post._id})

      res.status(200).json({
         message : 'Post has Been delected successfully',postID:post._id
      })
   }else{
      res.status(403).json({message:"access denied , forbidden"})
   }
   
})


/**----------------------------------------------------
* @desc Update Post 
* @router /api/posts/:id
* @method PUT
* @access private (only  owner of the Post(user himself))
-------------------------------------------------------*/

module.exports.UpdatePostCtrl = asyncHandler(async(req,res)=>{
   // 1-validation
   const {error} = validateUpdatePost(req.body)
   if(error){
      return res.status(400).json({message:error.details[0].message})
   }
   // 2-Get the post From DB and check if post exist

   const post = await Post.findById(req.params.id)
   if(!post){
      return res.status(404).json({message:'Post not Found'})
   }

   // 3-check if  this post belong to logged in user (if user himself)
   if(post.user.toString() !== req.user.id){
      return res.status(403).json({message :"You are Not Authorized To update This Post "});
   }
   
   // 4-update the post 
   
   let updatedPost =await Post.findByIdAndUpdate(req.params.id,{
         $set:{
            title: req.body.title,
            description:req.body.description,
            category:req.body.category,
         }
      },{new:true}).populate("user",["-password"])

   // 5-send the response to the client 
   res.status(200).json(updatedPost)

})
/**----------------------------------------------------
* @desc Update Post Image
* @router /api/posts/upload-image/:id
* @method PUT
* @access private (only  owner of the Post(user himself))
-------------------------------------------------------*/

module.exports.UpdateImagePostCtrl = asyncHandler(async(req,res)=>{
   // 1-validation
   if(!req.file){
      return res.status(400).json({message:'no Image Provided'})
   }
   // 2-Get the post From DB and check if post exist

   const post = await Post.findById(req.params.id)
   if(!post){
      return res.status(404).json({message:'Post not Found'})
   }

   // 3-check if  this post belong to logged in user (if user himself)
   if(post.user.toString() !== req.user.id){
      return res.status(403).json({message :"You are Not Authorized To update This Post "});
   }
   
   // 4-delete the old Image post
   await cloudinaryRemoveImage(post.image.publicId)

   // 5-upload new Photo 
   const pathImage = path.join(__dirname,`../images/${req.file.filename}`)
   const result=await cloudinaryUploadImage(pathImage)

   // 6-update the image field in db
   let updatedPost =await Post.findByIdAndUpdate(req.params.id,{
      $set:{
         image:{
            url      :result.secure_url,
            publicId :result.public_id,
         }
      }
   },{new:true});

   // 7-send the response to the client 
   res.status(200).json(updatedPost);

   // 8-remove Image from the server 
   fs.unlinkSync(pathImage);

})



/**----------------------------------------------------
* @desc Toggle Like 
* @router /api/posts/like/:id
* @method PUT
* @access private (only  login user)
-------------------------------------------------------*/

module.exports.toggleLikeCtrl = asyncHandler(async(req,res)=>{

   const loggedInUser = req.user.id;
  
   //1 - get the current post
   let post = await Post.findById(req.params.id)
   if(!post){
      return res.status(404).json({message:"Post Not found"})
   }

   const isPostAlreadyLiked = post.likes.find(
      (user)=>{return user.toString()=== loggedInUser;})
   if(isPostAlreadyLiked){
      // remove like
      post = await Post.findByIdAndUpdate(req.params.id,{
         $pull:{likes:loggedInUser}
      },{new:true})
   }else{
      // add new like
      post= await Post.findByIdAndUpdate(req.params.id,{
         $push:{likes:loggedInUser}
         },{new: true})
   }
   res.status(200).json(post)

})