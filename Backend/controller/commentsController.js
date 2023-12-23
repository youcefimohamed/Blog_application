const path = require('path')
const asyncHandler = require("express-async-handler")
const {Comment,validateCreateComment,validateUpdateComment} = require("../modules/Comment")
const {User} = require('../modules/User')



/**----------------------------------------------------
* @desc Create New Comment
* @router /api/comments
* @method POST
* @access private (only login user )
-------------------------------------------------------*/

module.exports.createNewCommentCtrl = asyncHandler(async(req,res)=>{
   const {error}= validateCreateComment(req.body);
   if(error){
      res.status(401).json({message:error.details[0].message})
   }

   const profile =await User.findById(req.user.id)

   const comment = await new Comment({
      postId:req.body.postId,
      text : req.body.text,
      user : req.user.id,
      username:profile.username,
   })
   //save to db
   await comment.save()

   res.status(201).json(comment)

})


/**----------------------------------------------------
* @desc Get All Comments
* @router /api/comments
* @method Get
* @access private (only Admin )
-------------------------------------------------------*/

module.exports.getAllCommentsCtrl = asyncHandler(async(req,res)=>{

   const comment  = await Comment.find().populate("user")
   res.status(200).json(comment)

})

/**----------------------------------------------------
* @desc Delete  Comment
* @router /api/comments/:id
* @method DELETE
* @access private (only Admin and User Himself)
-------------------------------------------------------*/

module.exports.deleteCommentCtrl = asyncHandler(async(req,res)=>{

   const comment  = await Comment.findById(req.params.id)
   if(!comment){
      return  res.status(404).json({message:"Comment not Found"})
   }

   if (req.user.id===comment.user.toString() || req.user.isAdmin){
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"Comment Has been deleted"}) 
   } else{
      res.status(403).json({message:"Access denied , not allowed"}) 
   }
   
})





/**----------------------------------------------------
* @desc Update New Comment
* @router /api/comments/:id
* @method PUT
* @access private (only owner of the comment )
-------------------------------------------------------*/

module.exports.updateCommentCtrl = asyncHandler(async(req,res)=>{
   const {error}= validateUpdateComment(req.body);
   if(error){
      res.status(401).json({message:error.details[0].message})
   }
   const comment = await Comment.findById(req.params.id)

   if(!comment){
      return  res.status(404).json({message:"Comment not Found"})
   }
   if(req.user.id !== comment.user.toString()){
      return   res.status(403).json({message:'You are Not Authorized to update this Comment'})
   }
   const commentUpdated = await Comment.findByIdAndUpdate(req.params.id,{
      $set : {
         text:req.body.text,
      }
   },{new:true})
   
   res.status(201).json(commentUpdated)
})
