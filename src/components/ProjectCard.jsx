import React from 'react'
import Card from 'react-bootstrap/Card';
import projImg from '../assets/image1.png'
import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { serverUrl } from '../../services/serverUrl';


function ProjectCard({projects}) {
/*   console.log(projects); */
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <Card style={{ width: '100%' }} className='shadow mt-4' onClick={handleShow}>
      <Card.Img variant="top" src={`${serverUrl}/uploads/${projects.projImage}`} width={'100%'} />
      <Card.Body>
        <Card.Title className='text-center'>{projects?.title}</Card.Title>
       
      </Card.Body>
    </Card>

    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{projects?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
            <img src={projImg} alt="no image" width={'100%'} />
            </Col>
            <Col sm={12} md={6}>
            <h4>Description</h4>
            <p>{projects.overview}</p>
            <h4 className='mt-3'>Technologies</h4>
            <p>{projects.language}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-start'>
          <Link to={projects.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='fa-2x' />
          </Link>

          <Link to={projects.website} target='_blank'><FontAwesomeIcon icon={faLink} className='fa-2x ms-4' /></Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectCard