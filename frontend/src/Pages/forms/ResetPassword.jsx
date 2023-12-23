import React, { useEffect, useState } from 'react'
import "./form.css"
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getResetPassword, resetPassword } from '../../redux/ApiCalls/passwordApiCall'
function ResetPassword() {

   const [password, setpassword] = useState('')

   const dispatch = useDispatch()
   
   const {userId,token} =useParams()
   
   
   useEffect(()=> {
      dispatch(getResetPassword(userId,token))
   },[userId,token])

   const {isError} = useSelector(state=>state.password)
   
   console.log(isError)
   // form submit handler
   const formSubmitHandler = (e) => {
      e.preventDefault()

      if (password.trim() === "") {
         return toast.error('Password is Required')
      }
      if (password.trim().length < 8) {
         return toast.error('Your password must be at least 8 characters ')
      }
      dispatch(resetPassword(password,{userId,token}))
   }
   return (
      <section className="form--container">
         {isError?
         <h1 className='text-danger'>Not Found</h1>
         :
         <>
         <h1 className="form--title">Reset Password</h1>
         <form onSubmit={formSubmitHandler} className="form-">
            <div className="form--group">
               <label htmlFor="password" className='form--label'>
                  Reset password
               </label>
               <input type="password"
                  className="form--input"
                  id='password'
                  placeholder='Entre New Password'
                  onChange={(e) => { setpassword(e.target.value) }}
               />
            </div>
            <button type="submit" className='form--btn' >Submit</button>
         </form>
         
         </>
         
         
         
         }

      </section>
   )
}

export default ResetPassword