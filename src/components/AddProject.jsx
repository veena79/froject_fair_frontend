import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectApi } from '../../services/allApi';
import {ToastContainer,toast } from 'react-toastify';
import { addResponseContext } from '../context/DataShare';
import 'react-toastify/dist/ReactToastify.css'


function AddProject() {
  const [show, setShow] = useState(false);
  const [projectDetails,setProjectDetails]=useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projImage:""
  })
 

  const [preview,setPreview]=useState("")
const [token,setToken]=useState("")
const [key,setKey]=useState(0)
const {setAddResponse}=useContext(addResponseContext)
  console.log(projectDetails);

  const handleFile=(e)=>{
    setProjectDetails({...projectDetails,projImage:e.target.files[0]})
  }

 
    
     

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true);
    handleClose1()
  }
 

  const handleClose1=()=>{
    setProjectDetails({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projImage:""
    })
    setPreview("")
    if(key==0){
      setKey(1)
    }
    else{
      setKey(0)
    }
  }
  useEffect(()=>{
    if(projectDetails.projImage){
      setPreview(URL.createObjectURL(projectDetails.projImage));
    }
   /*  */ /* console.log(preview); */
  },[projectDetails.projImage])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])

  const handleAdd=async(e)=>{
    e.preventDefault()
    const {title,language,github,website,overview,projImage}=projectDetails
if(!title||!language||!github||!website||!overview||!projImage){
  alert("please fill the form completely")
}
else{
//api
//inorder to send uploaded content-formData
const reqBody=new FormData()
reqBody.append("title",title)
reqBody.append("language",language)
reqBody.append("github",github)
reqBody.append("website",website)
reqBody.append("overview",overview)
reqBody.append("projImage",projImage)
if(token){
  const reqHeader={
    "Content-Type":"multipart/form-data",
    "Authorization":`Bearer ${token}`
  }
  const result=await addProjectApi(reqBody,reqHeader)
console.log(result);
if(result.status==200){
  toast.success('project uploaded successfully')
  handleClose()
  setAddResponse(result.data)
}
}

else{
alert("please login")
}




}
  }
  return (
    <>
    <button className='btn btn-success'  onClick={handleShow}>Add project</button>
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
            <label htmlFor="projImg">
              <input id='projImg'type="file" style={{display:'none'}} key={key} onChange={(e)=>handleFile(e)} />
              <img src={preview?preview:"https://icons.iconarchive.com/icons/webalys/kameleon.pics/512/Images-icon.png"} alt="no image" width={'100%'} />
            </label>
            </Col>
            <Col sm={12} md={6}>
            <form className='p-3'>
              <div className="mb-3">
                <input type="text"placeholder='Title' value={projectDetails.title} className='form-control'onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/>
              </div>
              <div className="mb-3">
              <input type="text"placeholder='Language' value={projectDetails.language} className='form-control' onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}/>
              </div>
              <div className="mb-3">
              <input type="text"placeholder='Github' value={projectDetails.github} className='form-control' onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}/>
              </div>
              <div className="mb-3">
              <input type="text"placeholder='Website' value={projectDetails.website} className='form-control' onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}/>
              </div>
              
              <div className="mb-3">
                <textarea placeholder='overview' value={projectDetails.overview} className='form-control' rows={'4'} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}></textarea>
              </div>
            </form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button type="button" variant="success" onClick={handleAdd}>
           Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    </>
  )
}

export default AddProject