import { passwordActions } from "../slices/passwordSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";


// forget Password
export function forgetPassword(email) {
   return async () => {
      try {

         const { data } = await request.post("/api/password/reset-password-link", { email })
         toast.success(data.message)
      } catch (error) {
         toast.error(error.response.data.message)
      }
   }
}

// get reset  Password
export function getResetPassword(userId, token) {
   return async (dispatch) => {
      try {

         await request.post(`/api/password/reset-password/${userId}/${token}`)
      } catch (error) {
         console.log(error)
         dispatch(passwordActions.setError())
      }

   }
}
//  reset the Password
export function resetPassword(newPassword, user) {
   return async () => {
      try {

         const { data } = await request.post(
            `/api/password/reset-password/${user.userId}/${user.token}`,
            {
               password: newPassword
            })
            toast.success(data.message)
      } catch (error) {
         toast.error(error.response.data.message)
      }

   }
}