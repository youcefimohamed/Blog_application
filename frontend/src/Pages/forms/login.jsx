import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import "./form.css"
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/ApiCalls/authApiCall'
function Login() {

  const [email,setemail] =useState('')
  const [password,setpassword] =useState('')
  const dispatch = useDispatch()


  // form submit handler
  const formSubmitHandler = (e)=>{
    e.preventDefault()

    if(email.trim()===""){
      return toast.error('email is Required')
    }
    if(password.trim()===""){
      return toast.error('Password is Required')
    }
    if(password.trim().length<8){
      return toast.error('Your password must be at least 8 characters ')
    }
    dispatch(loginUser({email,password}))
  }
  return (
      <section className="form--container">
        <h1 className="form--title">Login to Your Account</h1>
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
          <div className="form--group">
            <label htmlFor="password" className='form--label'>
              password
            </label>
            <input type="password" 
            className="form--input" 
            id='password'
            placeholder='Entre Your Password'
            onChange={(e)=>{setpassword(e.target.value)}}
            />
          </div>
          <button type="submit" className='form--btn' >Login</button>
        </form>
        <div className="form--footer">
          Did you Forget your Password ? <Link to="/forget-password">Forget Password</Link>
        </div>
      </section>
    )
}

export default Login