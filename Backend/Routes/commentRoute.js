const { createNewCommentCtrl, getAllCommentsCtrl, deleteCommentCtrl, updateCommentCtrl } = require('../controller/commentsController')
const validateObjectId = require('../middlewares/validateObjectId')
const { verifyToken, verifyTokenAdmin } = require('../middlewares/verifytoken')

const Router = require('express').Router()


// api/comments
Router.route("/")
.post(verifyToken,createNewCommentCtrl)
.get(verifyTokenAdmin,getAllCommentsCtrl)

Router.route("/:id")
.delete(validateObjectId,verifyToken,deleteCommentCtrl)
.put(validateObjectId,verifyToken,updateCommentCtrl)
module.exports = Router
