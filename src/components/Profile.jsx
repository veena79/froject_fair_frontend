import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer,toast } from 'react-toastify';
import { editProfileApi } from '../../services/allApi'


function Profile() {
  const [open, setOpen] = useState(false);
  const [userDetails,setUserDetails]=useState({
    username:"",
    email:"",
    password:"",
    github:"",
    linkedin:"",
    profile:""

  })
  const [existingImage,setExistingImage]=useState("")
  const [preview,setPreview]=useState("")
  const handleProfileFile=(e)=>{
    e.preventDefault()
    setUserDetails({...userDetails,profile:e.target.files[0]})
  }

  useEffect(()=>{
if(userDetails.profile){
  setPreview(URL.createObjectURL(userDetails.profile))
}
else{
  setPreview("")
}
  },[userDetails.profile])

  useEffect(()=>{
if(sessionStorage.getItem("existingUser")){
  const user=JSON.parse(sessionStorage.getItem("existingUser"))
  setUserDetails({...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin})
  setExistingImage(user.profile)
}

  },[])

  const handleProfileUpdate=async()=>{
    const {username,email,password,github,linkedin,profile}=userDetails
    if(!username||!email||!password||!github||!linkedin){
      toast.info('please fill the fields')
    }
    else{
      const reqBody=new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      profile?reqBody.append("profile",profile):reqBody.append("profile",existingImage)
      const token=sessionStorage.getItem("token")
      if(preview){
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const result=await editProfileApi(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          toast.success('profile updated successfully')
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        }
        else{
          toast.error('something went wrong')
        }
        
      }
      else{
        const reqHeader={
          "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
      }
      const result=await editProfileApi(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          toast.success('profile updated successfully')
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        }
        else{
          toast.error('something went wrong')
        }
      }
  }
}
  return (
    <>
    <div className='shadow p-4 mx-3 rounded ' onMouseEnter={()=>setOpen(true)} >
      <div className='d-flex justify-content-between mt-3'>
      <h3 className='text-success'>Profile</h3>
      <button onClick={() => setOpen(!open)} className='btn btn-outline-info'><FontAwesomeIcon icon={faAngleUp} /></button>
      </div>

     <Collapse in={open}>
     <div>
     <div className='d-flex flex-column align-items-center justify-content-center'>
       <label htmlFor="profileImg">
        <input id='profileImg' for='' type="file" style={{display:'none'}} onChange={(e)=>handleProfileFile(e)} />
        {existingImage==""?

        <img src={preview?preview:"https://cdn-icons-png.flaticon.com/256/2829/2829835.png"} alt="no image" style={{width:'200px',height:'200px'}}/>
        :
        <img src={preview?preview:`${serverUrl}/uploads/${existingImage}`} alt="no image" style={{width:'200px',height:'200px'}}/>
}
       </label>

       <form className='mt-4 w-100'>
        <div className="mb-3">
          <input type="text" className='form-control' placeholder='Github' value={userDetails.github} onChange={(e)=>setUserDetails({...userDetails,github:e.target.value})}/>
        </div>
        <div className="mb-3">
          <input type="text " className='form-control' placeholder='Linkedin' value={userDetails.linkedin} onChange={(e)=>setUserDetails({...userDetails,linkedin:e.target.value})}/>
        </div>
        <div className="mb-3">
          <button type='button' className='btn btn-success w-100' onClick={handleProfileUpdate}>Update</button>
        </div>
       </form>
      </div>
     </div>
      </Collapse>
 
    </div>
    <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    </>
  )
}

export default Profile