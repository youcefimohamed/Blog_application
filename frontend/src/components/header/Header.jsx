
import React, { useState } from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector ,useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/ApiCalls/authApiCall'
export default function Header() {

   const dispatch = useDispatch()
   const [toggle, settoggle] = useState(false)
   const [dropdown, setdropdown] = useState(false)
   const auth = useSelector(state => state.auth)
   const user = auth.user
   const navigate = useNavigate()
// logout Handler
   const logoutHandler = ()=>{
      setdropdown(false)
      dispatch(logoutUser())
      navigate("/")
   }
   return (
      <header className="headers">
         <div className="headers-left">
            <Link to='/' className="headers-logo">
               <strong>BLOG</strong>
               <i className="bi bi-pencil"></i>
            </Link>
            <div onClick={() => { settoggle(prev => !prev) }} className="headers-menu">
               {toggle ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>}
            </div>
         </div>
         <nav style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }} className="navbars">
            <ul className="navs-links" >
               <Link to='/' onClick={() => { settoggle(false) }} className="navs-link">
                  <i className="bi bi-house"></i><span>Home</span>
               </Link>
               <Link to='/posts' onClick={() => { settoggle(false) }} className="navs-link">
                  <i className="bi bi-stickies"></i><span>Posts</span>
               </Link>
               {
                  user&&
                  (
                  <Link to='/posts/create-post' onClick={() => { settoggle(false) }} className="navs-link">
                     <i className="bi bi-journal"></i><span>Create</span>
                  </Link>
                  )
               }
               {
                  user?.isAdmin && (
                  <Link onClick={() => settoggle(false)} to="/admin-dashboard" className="navs-link">
                  <i className="bi bi-person-check"></i>
                  Admin Dashboard
                  </Link>
               )
               }
            </ul>
         </nav>
         <div className="headers-right">
            {user ?
               <>
                  <div className="headers-right-user-info">
                     <span onClick={() => { setdropdown(prev => !prev) }} className="headers-right-username">
                        {user.username}
                     </span>
                     <img onClick={() => { setdropdown(prev => !prev) }} src={user.profilePhoto.url}
                        alt="userPhoto"
                        className='headers-right-user-photo' />
                     {
                        dropdown && (
                           <div className="headers-right-dropdown">
                              <Link
                                 to={`/profile/${user._id}`}
                                 className='headers-right-dropdown-item'
                                 onClick={() => { setdropdown(false) }}>
                                 <i className="bi bi-person-fill"></i>
                                 <span>Profile</span>
                              </Link>
                              <div className="headers-right-dropdown-item"
                              onClick={logoutHandler}>
                                 <i className="bi bi-box-arrow-in-left"></i>
                                 <span>Logout</span>
                              </div>
                           </div>
                        )
                     }
                  </div>
               </> :
               <>
                  <Link to='/login' className="headers-right-link">
                     <i className="bi bi-box-arrow-in-right"></i>
                     <span>Login</span>
                  </Link>
                  <Link to="/register" className="headers-right-link">
                     <i className="bi bi-person-plus"></i>
                     <span>Register</span>
                  </Link>
               </>}
         </div>
      </header>
   )
}
