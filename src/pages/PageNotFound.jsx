import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'






function PageNotFound() {
  return (
    <div className="row w-100">
        <div className="col-md-3"></div>
        <div className="col-md-6">
        <div style={{height:'70v',width:'100%'}} className='d-flex justify-content-center align-items-center flex-column'>
        {/* <h1 className='text-success' style={{fontSize:'50px',fontWeight:'800'}}>404</h1> */}
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRfmZTzJnfdiQjQk4LWOFOZNAjJjZbOp6Omg&s" alt="no image" width={'100%'} />
        <h1>Look like you are lost</h1>
        <button className='btn btn-success mt-3'><FontAwesomeIcon icon={faArrowLeft} />Back Home</button>
    </div>
        </div>
        <div className="col-md-3"></div>

    </div>
  )
}

export default PageNotFound