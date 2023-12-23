const mongoose = require('mongoose')
// for check if id is objectID 
module.exports=(req,res,next)=>{
   if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      return res.status(400).json({message:"invalid id"})
   }
   next()
}