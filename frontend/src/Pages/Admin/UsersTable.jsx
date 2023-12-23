import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import './admin-table.css'
import { Link } from 'react-router-dom'
import swal from "sweetalert"
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfile, getAllProfile } from '../../redux/ApiCalls/profileApiCall'
function UsersTable() {
   const dispatch = useDispatch()
   const { profiles, loading, isProfileDeleted } = useSelector(state => state.profile)

   useEffect(() => {
      dispatch(getAllProfile())
   }, [isProfileDeleted])


   // Delete Post Handler
   const deleteUserHandler = (userId) => {
      swal({
         title: "Are you sure?",
         text: "Once deleted, you will not be able to recover this User!",
         icon: "warning",
         buttons: true,
         dangerMode: true,
      })
         .then((willDelete) => {
            if (willDelete) {
               dispatch(deleteProfile(userId));
            }
         });
   }

   return (
      <section className='tablee-container'>
         <AdminSidebar />
         <div className="tablee-wrapper">
            <h1 className="tablee-title">Users</h1>
            <table className="tablee">
               <thead>
                  <tr>
                     <th>Count</th>
                     <th>User</th>
                     <th>Email</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {profiles?.map((item, index) => {
                     return (<tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>
                           <div className="tablee-image">
                              <img
                                 src={item.profilePhoto.url}
                                 alt="error"
                                 className='tablee-user-image' />
                              <span className='tablee-username'>{item.username}</span>
                           </div>
                        </td>
                        <td>{item.email}</td>
                        <td>
                           <div className="tablee-button-group">
                              <button>
                                 <Link to={`/profile/${item._id}`}>View Profile</Link>
                              </button>
                              <button onClick={() => deleteUserHandler(item._id)}>
                                 delete Profile
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

export default UsersTable