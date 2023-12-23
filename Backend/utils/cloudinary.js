const cloudinary =require('cloudinary')

cloudinary.config({
   cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
   api_key : process.env.CLOUDINARY_API_KEY,
   api_secret :  process.env.CLOUDINARY_API_SECRET
});

// cloudinary Upload Image

const cloudinaryUploadImage = async(fileToUpload) =>{
   try {
      const data= await cloudinary.uploader.upload(fileToUpload,{
         resource_type:'auto'
      })
      return data
   } catch (error) {
      console.log(error);
      throw new Error("Internal server Error (cloudinary)")
   }
}

// cloudinary Remove Image

const cloudinaryRemoveImage = async(imagePublicId) =>{
   try {
      const result = await cloudinary.uploader.destroy(imagePublicId)
      return result
   } catch (error) {
      console.log(error);
      throw new Error("Internal server Error (cloudinary)")  

   }
}
// cloudinary Remove Many Image

const cloudinaryRemoveManyImages = async(publicIds) =>{
   try {
      const result = await cloudinary.v2.api.delete_resources(publicIds)
      return result
   } catch (error) {
      console.log(error);
      throw new Error("Internal server Error (cloudinary)")   
   }
}


module.exports = {
   cloudinaryUploadImage,
   cloudinaryRemoveImage,
   cloudinaryRemoveManyImages
}