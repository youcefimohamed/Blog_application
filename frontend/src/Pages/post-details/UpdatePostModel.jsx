import React, { useEffect, useState } from 'react'
import './upload-post.css'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux'
import { updatePost } from '../../redux/ApiCalls/postApiCall'
import { fetchCategories } from '../../redux/ApiCalls/categoryApiCall'

function UpdatePostModel({ setUpdatePost, post }) {
   
   const dispatch = useDispatch()
   const {categories} = useSelector(state=>state.category)

   useEffect(()=>{
      dispatch(fetchCategories())
   },[])

   const [title, setTitle] = useState(post.title)
   const [description, setDescription] = useState(post.description)
   const [category, setCategory] = useState(post.category)

   // form submit Handler
   const formSubmitHandler = (e) => {
      e.preventDefault()
      if (title.trim() === "") {
         return toast.error("Title Post is required");
      }
      if (description.trim() === "") {
         return toast.error('description Post is required');
      }
      if (category.trim() === "") {
         return toast.error('category Post is required');
      }

      dispatch(updatePost(post?._id, { title, description, category }))
      setUpdatePost(false)
      toast.success("Update Successfully !")
   }
   return (
      <div className='updates-post'>
         <form className="uploads-post-form" onSubmit={formSubmitHandler}>
            <abbr title="close">
               <i onClick={() => setUpdatePost(false)} className="bi bi-x-circle-fill updates-post-form-close"></i>
            </abbr>
            <h1 className="updates-post-title">
               Update Post
            </h1>
            <input
               type="text"
               className="updates-post-input"
               value={title}
               onChange={(e) => setTitle(e.target.value)} />
            <select
               className="updates-post-input"
               value={category}
               onChange={(e) => setCategory(e.target.value)}>
               <option value="" disabled>Select Category</option>
               {categories?.map((category) => {
                  return <option value={category.title} >{category.title}</option>
               })}


            </select>
            <textarea
               className='updates-post-textarea'
               rows="5"
               value={description}
               onChange={(e) => setDescription(e.target.value)}></textarea>
            <button type='submit' className='updates-post-btn'>Update Post</button>
         </form>
      </div>
   )
}

export default UpdatePostModel