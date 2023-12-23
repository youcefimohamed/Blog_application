import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import "./form.css"
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import { registerUser } from '../../redux/ApiCalls/authApiCall'
import { authActions } from '../../redux/slices/authSlices'

function Register() {
  
  const dispatch = useDispatch()
  const auth= useSelector((store)=>store.auth)
  const registerMessage = auth.registerMessage

  const [username,setUsername] =useState('')
  const [email,setemail] =useState('')
  const [password,setpassword] =useState('')
  const formSubmitHandler = (e)=>{
    e.preventDefault()
    if(username.trim()===""){
      return toast.error('username is Required')
    }
    if(email.trim()===""){
      return toast.error('email is Required')
    }
    if(password.trim()===""){
      return toast.error('Password is Required')
    }
    if(password.trim().length<8){
      return toast.error('Your password must be at least 8 characters ')
    }
    dispatch(registerUser({username,email,password}))
  }

  const Navigate =   useNavigate()
  if(registerMessage){
    swal({
      title:registerMessage,
      icon:'success',
      button:"ok",
    }).then(isOk=>{
      if(isOk){
        // go to login page
        Navigate('/login');
        dispatch(authActions.register(null))
        

      }
    })
  }
  return (
      <section className="form--container">
        <h1 className="form--title">Create new Account</h1>
        <form onSubmit={formSubmitHandler} className="form-">
          <div className="form--group">
            <label htmlFor="username" className='form--label'>
              Username
            </label>
            <input type="text" 
            className="form--input" 
            id='username'
            placeholder='Entre Your User name'
            onChange={(e)=>{setUsername(e.target.value)}}/>
          </div>
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
          <button type="submit" className='form--btn' >Register</button>
        </form>
        <div className="form--footer">
          Already Have an account ? <Link to="/login">Login</Link>
        </div>
      </section>
    )
}

export default Register