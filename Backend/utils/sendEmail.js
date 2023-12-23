const nodemailer = require("nodemailer")

module.exports = async (userEmail,subject,htmlTemplete)=>{
   try {
      const transporter = nodemailer.createTransport({
         service: "gmail",
         auth:{
            user:process.env.APP_EMAIL_ADDRESS,
            pass:process.env.APP_EMAIL_PASSWORD
            }
      })

      const mailOptions = {
         from : process.env.APP_EMAIL_ADDRESS,//sender
         to:userEmail,
         subject : subject,
         html:htmlTemplete
      }

      const info = await transporter.sendMail(mailOptions)
      console.log("email send : ",info.response)

   } catch (error) {
      console.log(error)
      throw new Error("Internal Server Error (nodemailer)")
   }
}