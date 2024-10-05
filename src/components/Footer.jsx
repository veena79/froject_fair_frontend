import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

import { faInstagram, faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
   <>
   <div className="row mt-5 p-3 bg-success">
       
       <div className="col-md-4 p-4 ms-md-5">
           <h4 className='text-light' ><FontAwesomeIcon icon={faStackOverflow} className='me-2 fs-2' />Project fair</h4>
           <p style={{textAlign:'justify'}} className='mt-4'>Discover the latest fashion trends and effortlessly shop for stylish clothing on our e-cart site.</p>
           
       </div>
       <div className="col-md-2 p-4 ">
           <div >
           <h4 className='text-white'>Home page</h4>
           <p className='mt-4'  ><Link to={'/'} style={{color:'black'}} >Home Page</Link></p>
           <p><Link to={'/project'} style={{color:'black'}} >project page</Link></p>
           <p> <Link to={'/dashboard'} style={{color:'black'}} >Dashboard</Link></p>
           </div>
           </div>
       <div className="col-md-2 p-4">
           <h4 className='text-white'>Guides</h4>
            <p className='mt-4' > <Link to={'/wishlist'} style={{color:'black'}} >React</Link></p>
            <p> <Link to={'/wishlist'} style={{color:'black'}} >React Bootstrap </Link></p>
            <p> <Link to={'/wishlist'} style={{color:'black'}} >Bootswatch </Link></p>
       </div>

       <div className="col-md-3 p-4">
           <h4 className='text-white'>Contact Us</h4>
           <div className='d-flex mt-4'>
           <input type="text" className='form-control' placeholder='Email ID' />
           <button className='btn btn-warning ms-3'>Subscribe</button>
           </div>
           <div className="d-flex mt-4 justify-content-between">
           <FontAwesomeIcon className='' icon={faInstagram} size='2xl' />
           <FontAwesomeIcon icon={faFacebook} size='2xl' />
           <FontAwesomeIcon icon={faTwitter} size='2xl'/>
           <FontAwesomeIcon icon={faLinkedin} size='2xl'/>
           </div>
       </div>
       <div className="col-md-1"></div>
       <div className='d-flex justify-content-center align-items-center'>
    <p>Copyright © 2024 project fair. Build with React.</p>
   </div>
   </div></>
  )
}

export default Footer