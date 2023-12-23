const router = require("express").Router()
const { 
   getAllUsersCtrl,
   getUserProfilCtrl,
   updateUserProfilCtrl,
   getUsersCountCtrl,
   profilePhotoUploadCtrl ,
   deleteUserProfileCtrl } = require("../controller/usersController")
const {verifyToken, verifyTokenAdmin,verifyTokenAndOnlyUser, verifyTokenAndAuthorization} = require("../middlewares/verifytoken")
const validateObjectID = require('../middlewares/validateObjectId')
const { photoUpload } = require("../middlewares/photoUpload")
// api/users/profile
router.route("/profile")
.get(verifyTokenAdmin,getAllUsersCtrl)

router.route("/count")
.get(verifyTokenAdmin,getUsersCountCtrl)

// api/users/profile/:id
router.route("/profile/:id")
.get(validateObjectID,getUserProfilCtrl)
.put(validateObjectID,verifyTokenAndOnlyUser,updateUserProfilCtrl)
.delete(validateObjectID,verifyTokenAndAuthorization,deleteUserProfileCtrl)

// api/users/profile/profile-photo-upload

router.route("/profile/profile-photo-upload")
.post(verifyToken,photoUpload.single("image"),profilePhotoUploadCtrl)



module.exports = router
