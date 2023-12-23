import { authActions } from "../slices/authSlices";
import request from "../../utils/request";
import { toast } from "react-toastify";


// login user
export function loginUser(user){
   return async (dispatch) => {
      try {

         const response = await request.post("/api/auth/login",user)
         dispatch(authActions.login(response.data))
         localStorage.setItem("userInfo",JSON.stringify(response.data))
      } catch (error) {
         toast.error(error.response.data.message)
      }
   }
}
// logout user
export function logoutUser(){
   return  (dispatch) => {
      dispatch(authActions.logout())
      localStorage.removeItem("userInfo")
   }
}

// register

 export function registerUser(user){
   return async (dispatch) =>{
      try {
         const {data} =await request.post("/api/auth/register",user)
         dispatch(authActions.register(data.message))
      } catch (error) {
         toast.error(error.response.data.message)
      }
   }

}

// verify email

 export function verifyEmail(userId,token){
   return async (dispatch) =>{
      try {
         await request.get(`/api/auth/${userId}/verify/${token}`)
         dispatch(authActions.setIsEmailVerified())
      } catch (error) {
         console.log(error)
      }
   }

}