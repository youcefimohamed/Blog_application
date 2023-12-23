const { createCategoryCtrl, getAllCategoryCtrl, DeleteCategoryCtrl } = require('../controller/CategoryController')
const { verifyTokenAdmin } = require('../middlewares/verifytoken')
const validateObjectId = require('../middlewares/validateObjectId')
const Router = require('express').Router()


// api/categories
Router.route("/")
.post(verifyTokenAdmin,createCategoryCtrl)
.get(getAllCategoryCtrl)

// api/categories/:id
Router.route("/:id")
.delete(validateObjectId,verifyTokenAdmin,DeleteCategoryCtrl)


module.exports = Router
