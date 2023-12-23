const path= require('path')
const multer = require('multer')

// Photo Storage
const photoStorage = multer.diskStorage({
   destination: function(req, file, cb)  {
      cb(null,path.join(__dirname,"../images"));
      },
   filename: function(req,file,cb){
         if(file){
            cb(null,new Date().toISOString().replace(/:/g,"-")+file.originalname);
         }else{
            cb(null,false)
         }
      }
   })


// photo upload middelware
const photoUpload = multer({
   storage : photoStorage,
   fileFilter : function(req,file,cb){
      if(file.mimetype.startsWith("image")){
         cb(null,true)
      }else{
         cb({message : "Unsupparted file format"},false)
      }
   },
   limits:{
      fileSize :1024 * 1024*2 // 2MB max size
   }

})

module.exports = {
   photoUpload,
}