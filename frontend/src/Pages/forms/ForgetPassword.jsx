import React, { useState } from 'react'
import "./form.css"
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { forgetPassword } from '../../redux/ApiCalls/passwordApiCall'
function ForgetPassword() {

  const [email,setemail] =useState('')

  const dispatch = useDispatch()

  // form submit handler
  const formSubmitHandler = (e)=>{
    e.preventDefault()

    if(email.trim()===""){
      return toast.error('email is Required')
    }
    dispatch(forgetPassword(email))
  }
  return (
      <section className="form--container">
        <h1 className="form--title">Forget Password</h1>
        <form onSubmit={formSubmitHandler} className="form-">
          <div className="form--group">
            <label htmlFor="email" className='form--label'>
              email
            </label>
            <input type="email" 
            className="form--input" 
            id='email'
            placeholder='Entre Your email'
            onChange={(e)=>{setemail(e.target.value)}}/>
          </div>

          <button type="submit" className='form--btn' >Submit</button>
        </form>
      </section>
    )
}

export default ForgetPassword