const Router = require('express').Router()
const { sendResetPasswordLink, getResetPasswordLinkCtrl, resetPasswordCtrl } = require('../controller/PasswordController')


// /api/password/reset-password-link
Router.post("/reset-password-link", sendResetPasswordLink)

// /api/password/reset-password/:userId/:token
Router.route("/reset-password/:userId/:token")
   .get(getResetPasswordLinkCtrl)
   .post(resetPasswordCtrl)

module.exports = Router
