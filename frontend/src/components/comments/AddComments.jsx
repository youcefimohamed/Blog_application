import React, { useState } from 'react'
import './add-comment.css'
import { toast } from 'react-toastify'

import { useDispatch, useSelector } from "react-redux";
import { createComment } from '../../redux/ApiCalls/commentApiCall';

function AddComments({postId}) {
   const [text, setText] = useState('')

   const dispatch = useDispatch()


   // form submit handler
   const formSubmitHandler = (e) => {
      e.preventDefault()
      if (text.trim() === "") {
         return toast.error("Please Write Something")
      }
      dispatch(createComment({text,postId}))
      setText("")
   }
   return (
      <form onSubmit={formSubmitHandler} className="add-comment">
         <input type="text"
            className='add-comment-input'
            placeholder='Add a Comment' 
            value={text}
            onChange={(e)=>setText(e.target.value)}
            />
         <button type='submit' className='add-comment-btn'>
            Comment
         </button>
      </form>
   )
}

export default AddComments