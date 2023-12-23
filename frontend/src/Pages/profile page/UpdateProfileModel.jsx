import React, { useState } from 'react'
import './UpdateProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../redux/ApiCalls/profileApiCall'




function  UpdateProfileModel({setUpdateProfile,profile}) {

   const dispatch =  useDispatch()

   const [username,setusername] = useState(profile.username)
   const [bio,setbio] = useState(profile.bio)
   const [password,setpassword] = useState("")

   // form submit Handler
   const formSubmitHandler = (e)=>{
      e.preventDefault()
      const updatedUser = {
         username:username,
         bio:bio,
      }
      if(password.trim()!==''){
         updatedUser.password = password;
      }
      dispatch(updateProfile(profile?._id ,updatedUser))
      setUpdateProfile(false)
   }
  return (
    <div className='update-profile'>
      <form className="update-profile-form" onSubmit={formSubmitHandler}>
         <abbr  title="close">
            <i onClick={()=>setUpdateProfile(false)} className="bi bi-x-circle-fill update-profile-form-close"></i>
         </abbr>
         <h1 className="update-profile-title">
            Update your profile
         </h1>
         <input 
         type="text" 
         className="update-profile-input" 
         value={username} 
         placeholder='username'
         onChange={(e)=>setusername(e.target.value)}/>
         <input 
         type="text" 
         className="update-profile-input" 
         value={bio} 
         placeholder='bio'
         onChange={(e)=>setbio(e.target.value)}/>
         <input 
         type="password" 
         className="update-profile-input" 
         placeholder='password'
         onChange={(e)=>setpassword(e.target.value)}/>
         <button type='submit'   className='update-profile-btn'>Update profile</button>
      </form>
    </div>
  )
}

export default  UpdateProfileModel