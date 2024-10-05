import React, { useContext, useEffect, useState } from 'react'
import AddProject from '../components/AddProject'
import EditProject from '../components/EditProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteProjectApi, userProjectApi } from '../../services/allApi'
import { addResponseContext } from '../context/DataShare'
import { Link } from 'react-router-dom'

function Myproject() {
  const [userProject,setUserProject]=useState([])
  const {addResponse}=useContext(addResponseContext)
  const [deleteStatus,setDeleteStatus]=useState(false)
const getUserProject=async()=>{
  if(sessionStorage.getItem("token")){
    const token=sessionStorage.getItem("token")
    const reqHeader={ "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`}
    const result=await userProjectApi(reqHeader)
    setUserProject(result.data);
  }
  
}
console.log(userProject);

const handleDelete=async(id)=>{
  
  const result=await deleteProjectApi(id)
  console.log(result);
  if(result.status==200){
    setDeleteStatus(true)
  }
}
useEffect(()=>{
  getUserProject()
  setDeleteStatus(false)
},[addResponse,deleteStatus])
  return (
    <div className='shadow px-4 py-4 rounded'>
      <div className='d-flex justify-content-between'>
      <h4 className='text-success'>My project</h4>
<AddProject/>
    </div>
   {userProject?.length>0? 
   userProject?.map((item)=>(<div className='mt-4 bg-light p-3 rounded d-flex jusify-content-between'>
    <h5>{item.title}</h5>
    <div className="d-flex align-items-center">
      <EditProject project={item}/>
      <Link to={item?.website} target='_blank'><FontAwesomeIcon icon={faGlobe} className='text-warning ms-3'/></Link>
      <Link to={item?.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='text-success ms-3' /></Link>
      <FontAwesomeIcon icon={faTrash} className='text-danger ms-3' onClick={()=>handleDelete(item?._id)} />
    </div>
        </div>))
    
  :
  <p>no project to display</p>
  }
    </div>
    
  )
}

export default Myproject