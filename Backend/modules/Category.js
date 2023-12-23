const mongoose = require('mongoose')
const joi = require("joi")

const CategorySchema= new mongoose.Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
   },
   title:{
      type : String,
      required:true,
      trim:true
   },

},
{timestamps: true}
)

// Comment model

const Category = mongoose.model("Category",CategorySchema)

// validate Create Category 

function validateCreateCategory(obj){
   const schema = joi.object({
      title: joi.string().required().trim().label('title'), 
   })
   return schema.validate(obj)
}



module.exports = {
   Category,
   validateCreateCategory,
}