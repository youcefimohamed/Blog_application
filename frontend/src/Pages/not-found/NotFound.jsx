import React from 'react'
import {Link} from 'react-router-dom'
import "./notFound.css"
function NotFound() {
  return (
    <section className='not-found'>
      <h1 className='not-found-title'>404</h1>
      <h1 className='not-found-text'>Page Not Found</h1>
      <Link to='/' className='not-found-link' >Go to Page Home</Link>
    </section>
  )
}

export default NotFound