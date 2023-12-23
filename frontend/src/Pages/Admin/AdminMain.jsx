import React, { useEffect } from 'react'
import {Link} from "react-router-dom"
import AddCategoryForm from './AddCategoryForm'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/ApiCalls/categoryApiCall';
import {  getUsersCount } from '../../redux/ApiCalls/profileApiCall';
import { getPostsCount } from '../../redux/ApiCalls/postApiCall';
import { getComments } from '../../redux/ApiCalls/commentApiCall';


function AdminMain() {

  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(fetchCategories())
    dispatch(getUsersCount())
    dispatch(getPostsCount())
    dispatch(getComments())
  },[])
  
  const {categories} = useSelector(state=>state.category)
  const {postsCount} = useSelector(state=>state.post)
  const {usersCount} = useSelector(state=>state.profile)
  const {comments} = useSelector(state=>state.comment)

  return (
    <div className='admin-main'>
      <div className="admin-main-header">
        <div className="admin-main-card">
          <h5 className="admin-card-title">Users</h5>
          <div className="admin-card-count">{usersCount}</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin-dashboard/users-table" className='admin-card-link'>See All Users</Link>
            <div className="admin-card-icon">
              <i className="bi bi-person"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Posts</h5>
          <div className="admin-card-count">{postsCount}</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin-dashboard/posts-table" className='admin-card-link'>See All Posts</Link>
            <div className="admin-card-icon">
              <i className="bi bi-file-post"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Categories</h5>
          <div className="admin-card-count">{categories?.length}</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin-dashboard/categories-table" className='admin-card-link'>See All Categories</Link>
            <div className="admin-card-icon">
              <i className="bi bi-tag-fill"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Comments</h5>
          <div className="admin-card-count">{comments?.length}</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin-dashboard/comments-table" className='admin-card-link'>See All Comments</Link>
            <div className="admin-card-icon">
              <i className="bi bi-chat-left-text"></i>
            </div>
          </div>
        </div>
      </div>
      <AddCategoryForm/>
    </div>
  )
}

export default AdminMain