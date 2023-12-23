const mongoose = require('mongoose')

const joi = require('joi')

// Post schema

const postSchema = new mongoose.Schema({
   title:{
      type:String,
      required:true,
      trim:true,
      minlenght : 2,
      maxlenght:200,
   },
   description:{
      type:String,
      required:true,
      trim:true,
      minlenght : 10,
   },
   // il ya un rolation avec virtual mongoose
   user:{
      type:mongoose.Types.ObjectId,
      ref:'User',
      required: true
   },
   category:{
      type:String,
      required:true,
   },
   image:{
      type:Object,
      default:{
         url:"",
         public_id:null,
      }
   },
   likes:[
      {
         type:mongoose.Types.ObjectId,
         ref:'User',
      },

   ]

},{
   timestamps:true,
   toJSON: {
      virtuals:true,
   },
   toObject:{
      virtuals:true,
   }
})
// *** Get Comments when we get Posts  
postSchema.virtual("comments",{
   ref:'Comment',
   foreignField :"postId",  
   localField : "_id" ,
})

// Post Model

const Post  =mongoose.model("Post",postSchema)

// Validate Create Post
function validateCreatePost(obj){
   const schema =joi.object({
      title: joi.string().trim().min(2).max(200).required(),
      description: joi.string().trim().min(10).required(),
      category: joi.string().trim().required(),
   });
   return schema.validate(obj)
}
// Validate Update Post
function validateUpdatePost(obj){
   const schema =joi.object({
      title: joi.string().trim().min(2).max(200),
      description: joi.string().trim().min(10),
      category: joi.string().trim(),
   });
   return schema.validate(obj)
}

module.exports={
   Post,
   validateCreatePost,
   validateUpdatePost
};