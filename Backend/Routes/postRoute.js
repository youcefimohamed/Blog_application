const router = require("express").Router()
const { createNewPostCtrl, getAllPostCtrl, getSinglePostCtrl, getCountPostsCtrl, deletePostCtrl, UpdatePostCtrl, UpdateImagePostCtrl, toggleLikeCtrl } = require("../controller/PostController")
const { photoUpload } = require("../middlewares/photoUpload")
const { verifyTokenAndOnlyUser, verifyToken } = require("../middlewares/verifytoken")
const validateObjectId  = require('../middlewares/validateObjectId')

// api/posts
router.route('/')
.post(verifyToken,photoUpload.single('image'),createNewPostCtrl)
.get(getAllPostCtrl)

// api/posts/count
router.route("/count").get(getCountPostsCtrl)

// api/posts/:id
router.route("/:id")
.get(validateObjectId,getSinglePostCtrl)
.delete(validateObjectId,verifyToken,deletePostCtrl)
.put(validateObjectId,verifyToken,UpdatePostCtrl)

// api/posts/upload-image/:id
router.route("/upload-image/:id")
.put(validateObjectId,verifyToken,photoUpload.single("image"),UpdateImagePostCtrl)

// api/posts/like/:id
router.route("/like/:id").put(validateObjectId,verifyToken,toggleLikeCtrl)

module.exports = router