const mongoose = require('mongoose')
const joi = require("joi")

const CommentsSchema= new mongoose.Schema({

   // relation with virtial mongoose (comments)
   postId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Post',
      required:true
   },
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
   },
   text:{
      type : String,
      required:true
   },
   username:{
      type : String,
      required:true
   },

},
{timestamps: true}
)

// Comment model

const Comment = mongoose.model("Comment",CommentsSchema)

// validate Create comment 

function validateCreateComment(obj){
   const schema = joi.object({
      postId    : joi.string().required().label('post id') ,
      text     : joi.string().required().trim(), 
   })
   return schema.validate(obj)
}


// validate Update comment 
function validateUpdateComment(obj){
   const schema = joi.object({
      text     : joi.string().trim(), 
   })
   return schema.validate(obj)
}

module.exports = {
   Comment,
   validateCreateComment,
   validateUpdateComment
}