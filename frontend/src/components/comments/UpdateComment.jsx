import React, { useState } from 'react'
import './UpdateComment.css'
import {toast} from "react-toastify"
import { useDispatch } from 'react-redux'
import { updateComment } from '../../redux/ApiCalls/commentApiCall'

function  UpdateComment({setUpdateComment ,commentForUpdate}) {

   const [text,setText] = useState(commentForUpdate?.text)
   const dispatch = useDispatch()

   // form submit Handler
   const formSubmitHandler = (e)=>{
      e.preventDefault()
      if(text.trim()===""){
         return toast.error("Please write Something");
       }
       dispatch(updateComment(commentForUpdate?._id,{text}))
       setUpdateComment(false)
       toast.success("comment Updated !")

   }
  return (
    <div className='updates-comment'>
      <form className="uploads-comment-form" onSubmit={formSubmitHandler}>
         <abbr  title="close">
            <i onClick={()=>setUpdateComment(false)} className="bi bi-x-circle-fill updates-comment-form-close"></i>
         </abbr>
         <h1 className="updates-comment-title">
            Edit comment
         </h1>
         <input 
         type="text" 
         className="updates-comment-input" 
         value={text} 
         onChange={(e)=>setText(e.target.value)}/>
         <button type='submit'   className='updates-comment-btn'>Update comment</button>
      </form>
    </div>
  )
}

export default  UpdateComment