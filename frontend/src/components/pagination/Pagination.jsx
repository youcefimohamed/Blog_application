import React from 'react'
import './Pagination.css'
function Pagination({pages,currentPage,setCurrentPage}) {

  const generatedPages = []
  for (let index = 1; index <= pages; index++) {
    generatedPages.push(index)
    
  }

  return (
    <div className='pagination'>
      <button 
      onClick={()=>{setCurrentPage(current=>current-1)}} 
      className="page previous"
      disabled={currentPage===1}
      >Previous</button>
      {generatedPages.map((page)=>{
        return <div 
        onClick={()=>setCurrentPage(page)} 
        key={page} 
        className={currentPage===page? "page active": 'page'}

        >{page}</div>
      })}
      <button 
      onClick={()=>{setCurrentPage(next=>next+1)}} 
      disabled={currentPage===pages}
      className="page next">Next</button>
    </div>
  )
}

export default Pagination