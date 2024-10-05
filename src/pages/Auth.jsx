import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Auth({register}) {
  const navigate=useNavigate()
  const [userDetails,setUserDetails]=useState({
    username:"",
    email:"",
    password:""
  })
  console.log(userDetails);
  const handleRegister=async()=>{
    const {username,email,password}=userDetails
    if(!username||!email||!password){
      toast.info('please fill the form completely')
    }
    else{
   const result= await registerApi(userDetails)
   console.log(result);
   if(result.status==200){
    toast.success('registration successful')
    navigate('/login')
   }
   else{
    toast.error('something went wrong.please try after some time')
   }
    }
  }


  const handleLogin=async()=>{
    const {email,password}=userDetails
    if(!email||!password){
      toast.info("please fill the fiels completely")
    }
    else{
      const result=await loginApi({email,password})
      console.log(result);
      if(result.status==200){
        toast.success("login succesful")
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
       setTimeout(()=>{
        navigate('/')
       },2000)
      
      }
      else{
        toast.error(result.response.data)
      }
    }
  }
  return (
    <div className='container-fluid d-flex justify-content-center align-items-center flex-column' style={{height:'100vh'}}>
      <Link to={'/'}><FontAwesomeIcon icon={faArrowLeft} className='me-3'/>Back to home</Link>
<div className="container w-75 bg-success p-3 mt-2 rounded">
  <Row>
    <Col sm={12} md={6} className='p-5 d-flex d-flex justify-content-center align-items-center'>
    <img src="https://c1.klipartz.com/pngpicture/935/337/sticker-png-windows-10-logo-login-user-email-button-flat-design-password-green.png" alt="no image" className='w-75' />
    </Col>
    <Col sm={12} md={6} className='d-flex justify-content-center align-items-center text-light flex-column'>
    <h3> <FontAwesomeIcon icon={faStackOverflow} className='me-3'/>Project fair</h3>
   {register? <h4>Sign up to your account</h4>:
    <h4>Sign in to your account</h4>}
    <form className='mt-4'>
      {register&&<div className="mb-3">
        <input type="text " placeholder='Username' className='form-control' onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})} />
      </div>}
      <div className="mb-3" >
      <input type="text " placeholder='Email' className='form-control' onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})} />
      </div>
      <div className="mb-3">
      <input type="text " placeholder='password' className='form-control' onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} />
      </div>
      <div className="mb-3">
        
        {register? <div>
          <button type='button' className='btn btn-warning w-100' onClick={handleRegister}>Register</button>
        <p className='mt-2'>Already a user?click here to <Link to={'/login'} className='text-warning'>login</Link></p>
        </div>:
        <div>
           <button  type='button' className='btn btn-warning w-100 mt-3' onClick={handleLogin}>Login</button>
           <p className='mt-2'>New User?Click here to <Link to={'/register'} className='text-warning'>register</Link></p>
        </div>}
       

      </div>
    </form>
    </Col>
  </Row>
</div>
<ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    </div>
  )
}

export default Auth