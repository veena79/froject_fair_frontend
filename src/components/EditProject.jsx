import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../../services/serverUrl';
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer,toast } from 'react-toastify';
import { editProjectApi } from '../../services/allApi';

function EditProject({project}) {
  const [show, setShow] = useState(false);
  const [projectDetails,setProjectDetails]=useState({
    id:project?._id,
    title:project?.title,
    language:project?.language,
    github:project?.github,
    website:project?.website,
    overview:project?.overview,
    projImage:""

  })
  const [preview,setPreview]=useState("")
  const [key,setKey]=useState(0)
  const handleClose = () => {setShow(false);
  handleClose1()
}
  const handleShow = () => setShow(true);
  const handleFileUpload=(e)=>{
    e.preventDefault()
    setProjectDetails({...projectDetails,projImage:e.target.files[0]})
  }
    useEffect(()=>{
    if(projectDetails.projImage){
      setPreview(URL.createObjectURL(projectDetails.projImage));
    }

  },[projectDetails.projImage])

  const handleClose1=()=>{
    setProjectDetails({
      title:project.title,
      language:project.language,
      github:project.github,
      website:project.website,
      overview:project.overview,
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
  const handleUpdate=async(e)=>{
    e.preventDefault()
    const {id,title,language,github,website,overview,projImage}=projectDetails
if(!title||!language||!github||!website||!overview){
  toast.info("please fill the form completely")
  }
  else{
    const reqBody=new FormData()
    reqBody.append("title",title)
    reqBody.append("language",language)
    reqBody.append("github",github)
    reqBody.append("website",website)
    reqBody.append("overview",overview)
    preview?reqBody.append("projImage",projImage):reqBody.append("projImage",project.projImage)

    const token=sessionStorage.getItem("token")
    if(preview){//if there is new image upload
const reqHeader={
  "Content-Type":"multipart/form-data",
    "Authorization":`Bearer ${token}`
}
const result=await editProjectApi(id,reqBody,reqHeader)
console.log(result);
if(result.status==200){
  toast.success('project updated successfulyy')
  handleClose()
}
else{
  toast.error('something went wrong')
}
    }
    else{//no new image upload
      const reqHeader={
        "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
    }
    const result=await editProjectApi(id,reqBody,reqHeader)
console.log(result);
if(result.status==200){
  toast.success('project updated successfulyy')
  handleClose()
}
else{
  toast.error('something went wrong')
}
  }
}
  }
  return (
    <>
    <FontAwesomeIcon icon={faPen} className='text-info' onClick={handleShow} />
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
            <label htmlFor="projImg">
              <input id='projImg'type="file" style={{display:'none'}} key={key} onChange={(e)=>handleFileUpload(e)} />
              <img src={preview?preview:`${serverUrl}/uploads/${project.projImage}`} alt="no image" width={'100%'} />
            </label>
            </Col>
            <Col sm={12} md={6}>
            <form className='p-3'>
              <div className="mb-3">
                <input type="text"placeholder='Title' className='form-control' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/>
              </div>
              <div className="mb-3">
              <input type="text"placeholder='Language' className='form-control' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}/>
              </div>
              <div className="mb-3">
              <input type="text"placeholder='Github' className='form-control' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}/>
              </div>
              <div className="mb-3">
              <input type="text"placeholder='Website' className='form-control' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}/>
              </div>
              
              <div className="mb-3">
                <textarea placeholder='overview' className='form-control' rows={'4'} value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}></textarea>
              </div>
            </form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
          Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    </>
  )
}

export default EditProject