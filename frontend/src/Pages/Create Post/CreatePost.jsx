import React, { useEffect, useState } from 'react'
import './CreatePost.css'
import {toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPosts } from '../../redux/ApiCalls/postApiCall';
import {RotatingLines}  from "react-loader-spinner"
import { fetchCategories } from '../../redux/ApiCalls/categoryApiCall';

function CreatePost() {
   const  [title,setTitle] = useState("");
   const  [description,setDescription] = useState("");
   const  [category,setCategory] = useState("");
   const  [file,setFile] = useState(null);


  const dispatch = useDispatch()
  const  {loading,isPostCreated} = useSelector(state=>state.post)
  const {categories} = useSelector(state=>state.category)


  //  Form submit Handler 
  const formSubmitHandler = (e)=>{
    e.preventDefault();
    if(title.trim()===""){
      return toast.error("Title Post is required");
    }
    if(description.trim()===""){
      return toast.error('description Post is required');
    }
    if(category.trim()===""){
      return toast.error('category Post is required');
    }
    if(!file){
      return toast.error('Post Image is required');
    }

    const formData= new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);

    dispatch(createPosts(formData))
  }
  const navigate = useNavigate()
  useEffect(()=>{
    if(isPostCreated){
      navigate("/")
    }
  },[isPostCreated,navigate])

  useEffect(()=>{
    dispatch(fetchCategories())
  },[])

  return (
    <div className="section create-post">
      <h1 className='create-post-title'>Create New Post</h1>
      <form  onSubmit={formSubmitHandler} className="create-post-form">
        <input 
        type="text" 
        placeholder='Post Title' 
        className='create-post-input'
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}} />
        <select
        className='create-post-input' 
        value={category}
        onChange={(e)=>{setCategory(e.target.value)}}>
          <option value="" disabled>Select A Category</option>
          {categories?.map((category) => {
                  return <option key={category._id} value={category.title} >{category.title}</option>
               })}
        </select>
        <textarea 
        className='create-post-textarea' 
        placeholder='Post Description' 
        rows="5"
        value={description}
        onChange={(e)=>{setDescription(e.target.value)}}></textarea>
        <input 
        type="file" 
        name='file' 
        id='file' 
        className='create-post-upload'
        onChange={(e)=>{setFile(e.target.files[0])}} />
        <button type="submit" className='create-post-btn'>
          {loading ? 
          (
            <RotatingLines
              strokeColor ="white"
              strokeWidth = "5"
              animationDuration="0.75"
              width="40"
              visible={true}
              />
          )
          :
          "Create"
          }
          </button>
      </form>
    </div>
  )
}

export default CreatePost