import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleimage from '../assets/images.jpeg'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectApi } from '../../services/allApi'

function Home() {
    const [isLogin,setIsLogin]=useState(false)
    const [homeProject,setHomeProject]=useState([])
    const getHomeProject=async()=>{
        const result=await homeProjectApi()
        setHomeProject(result.data);
    }
    console.log(homeProject);

    
    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsLogin(true)
        }
        else{
            setIsLogin(false)
        }
        getHomeProject()
    },[])
   

    
  return (
    <>
    <div className="container-fluid bg-success" style={{height:'100vh'}}>
<Row className='align-items-center p-3 p-md-5'>
    <Col xs={12} md={6} className='ps-5'>
    <h1 className='text-light'style={{fontSize:'50px'}}>Project Fair</h1>
    <p>one stop destination for all software developmentt projects</p>
   { !isLogin?<Link to={'/login'}><button className='btn btn-warning'><FontAwesomeIcon icon={faArrowRight} className="ms-2"/>Get started</button></Link>:
    <Link to={'/dashboard'}>
    <button className='btn btn-warning'><FontAwesomeIcon icon={faArrowRight} className="ms-2"/>Manage project</button></Link>}
    </Col>
    <Col xs={12} md={6}>
    <img src={titleimage} alt="no image" className='w-75' style={{marginTop:'80px'}} />
    </Col>
</Row>
    </div>

    <div className="container-fluid">
        <h1 className='mt-5 text-center'>Explore our project</h1>
        <div className="row mt-5">
            {homeProject?.length>0?
            homeProject?.map((item)=>(
                <div className="col-md-4 p-4">
            <ProjectCard projects={item}/>
        </div>))
           : null}
            
        </div>
    <Link to={'/project'} className='text-center text-danger'>   <h5>See more projects</h5></Link>
    </div>
    </>
  )
}

export default Home