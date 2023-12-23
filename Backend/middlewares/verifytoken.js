const jwt =require("jsonwebtoken")

// verify Token

function verifyToken(req,res,next){
   const authToken =req.headers.authorization
   if(authToken){
      const token = authToken.split(" ")[1]
      try {
         const decodedPayload = jwt.verify(token,process.env.JWT_SECRET);
         req.user = decodedPayload;
         next()
      } catch (error) {
         return res.status(401).json({message:'invalid token ,acces denied'})
      }

   }else{
      return res.status(401).json({message:'no token provided,acces denied'})
   }
}

// verify Token and Admin
function verifyTokenAdmin(req,res,next) {
   verifyToken(req,res,()=>{
      if(req.user.isAdmin){
         next()
      }else{
         return res.status(403).json({message:"not Allowed ,Only Admin"})
      }
      


   })
  
}

// verify Token and Only user himself
function verifyTokenAndOnlyUser(req,res,next) {
   verifyToken(req,res,()=>{
      if(req.user.id===req.params.id){
         next()
      }else{
         return res.status(403).json({message:"not Allowed ,Only user Himself"})
      }
      
   })
  
}

// verify Token and  user himself and admin
function verifyTokenAndAuthorization(req,res,next) {
   verifyToken(req,res,()=>{
      if(req.user.id===req.params.id || req.user.isAdmin){
         next()
      }else{
         return res.status(403).json({message:"not Allowed ,Only user Himself Or Admin"})
      }
      
   })
  
}


module.exports = {
   verifyToken,
   verifyTokenAdmin,
   verifyTokenAndOnlyUser,
   verifyTokenAndAuthorization
}