import React from 'react'
import './admin.css'
import AdminMain from './AdminMain'
import AdminSidebar from './AdminSidebar'
function AdminDashbord() {
  return (
    <section className="admin-dashboard">
      <AdminSidebar/>
      <AdminMain/>
    </section>
  )
}

export default AdminDashbord