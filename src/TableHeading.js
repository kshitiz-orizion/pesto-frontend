import React from 'react'

const TableHeading =() =>{
    return(
        <section className="section">
        <label>
          <span>Index</span>
          <span>Title</span>
          <span>Description</span>
          <span>Status</span>
          <button className="btn btn-none">Edit</button>
          <button className="btn btn-none">Delete</button>
        </label>
      </section>
    )   
}

export default TableHeading