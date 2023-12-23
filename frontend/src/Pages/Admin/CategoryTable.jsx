import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import './admin-table.css'
import swal from "sweetalert"
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, fetchCategories } from '../../redux/ApiCalls/categoryApiCall';



function CategoriesTable() {

   const dispatch = useDispatch()
  
   useEffect(()=>{
     dispatch(fetchCategories())
   },[])
   
   const {categories} = useSelector(state=>state.category)

   // Delete Category Handler
   const deleteCategoryHandler = (categoryId) => {
      swal({
         title: "Are you sure?",
         text: "Once deleted, you will not be able to recover this Category!",
         icon: "warning",
         buttons: true,
         dangerMode: true,
      })
         .then((willDelete) => {
            if (willDelete) {
               dispatch(deleteCategory(categoryId))
            } 
         });
   }

   return (
      <section className='tablee-container'>
         <AdminSidebar />
         <div className="tablee-wrapper">
            <h1 className="tablee-title">Categories</h1>
            <table className="tablee">
               <thead>
                  <tr>
                     <th>Count</th>
                     <th>Category Title</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {categories?.map((item, index) => {
                     return (<tr key={item._id}>
                        <td>{index+1}</td>
                        <td>
                           <b>{item.title}</b>
                        </td>
                        <td>
                           <div className="tablee-button-group">
                              <button onClick={()=>deleteCategoryHandler(item._id)}>
                                 Delete Category
                              </button>
                           </div>
                        </td>

                     </tr>)
                  })}
               </tbody>

            </table>
         </div>
      </section>
   )
}

export default CategoriesTable