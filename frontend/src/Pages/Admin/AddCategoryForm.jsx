import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { createCategory } from '../../redux/ApiCalls/categoryApiCall';

function AddCategoryForm() {

   const dispatch  = useDispatch()
   


   const [title,setTitle] = useState("")
   // form submit handler 
   
   const formSubmitHandler = (e)=>{
      e.preventDefault()
      if(title.trim() === ""){
         return toast.error("Category Title is required")
      }
      dispatch(createCategory({title}))
      setTitle("")
   }


  return (
    <div className='add-category'>
      <h6 className='add-category-title'>Add New Category</h6>
      <form onSubmit={formSubmitHandler}  className="add-category-form">
         <div className="add-category-form-group">
            <label htmlFor="title">Category Title</label>
            <input 
            onChange={(e)=> setTitle(e.target.value)}
            type="text" 
            id='title' 
            value={title}
            placeholder='Entre Category Title'/>
         </div>
         <button type='submit' className='add-category-btn' >Add</button>
      </form>
    </div>
  )
}

export default AddCategoryForm