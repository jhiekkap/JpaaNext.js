import React, { useState } from 'react'
import { Dropdown, DropdownButton, Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios'

const ProjectForm = ({ projects, setProjects, edit, project, projectID }) => {
  const [showModal, setShowModal] = useState(false)

  const [title, setTitle] = useState('')
  const [story, setStory] = useState('')
  const [districts, setDistricts] = useState([])
  const [show, setShow] = useState(true)
  const [meters, setMeters] = useState([]) 

  //const handleClose = () => setShowModal(false)
  const handleCancel = () => {
    setShowModal(false)
    setTitle('')
    setStory('')
    setDistricts([])
    setShow(true)
    setMeters([])
  }

  const allDistricts = ['Kyrölä', 'Jamppa', 'Keskusta', 'Loutti','Pajala','Pöytäalho','Ahjo','Isokytö','Mikonkorpi','Nummenkylä']

  const handleSave = () => {
    let cloneProjects = [...projects]
    const newProject = {
      title,
      story,
      districts,
      show,
      meters,
    }
    if (edit) {
      cloneProjects = cloneProjects.map((proj, p) => p === projectID ? newProject : proj)
    } else {
      cloneProjects.push(newProject)
    }
    setProjects(cloneProjects)
    handleCancel()
    console.log(cloneProjects)
    axios
      .post('/api/projects', cloneProjects)
      .then(res => console.log(res))
  }
  const handleShow = () => {
    setShowModal(true)
    if (edit) {
      setTitle(project.title)
      setStory(project.story)
      setDistricts(project.districts)
      setShow(true)
      setMeters(project.meters)
    }
  }

  const handleSetDistrict = district => {
    setDistricts(districts.concat(district))
  }

  const handleDeleteDistrict = district => {
    setDistricts(districts.filter(dist => dist !== district))
  }

  return (
    <>
      {!edit ? (
        <Button variant='light' onClick={handleShow}>
          LUO UUSI HANKE
        </Button>
      ) : (
        <span onClick={handleShow}>MUOKKAA</span>
      )}

      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? 'MUOKKAA HANKETTA' : 'UUSI HANKE'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formGroupEmail'>
              <Form.Label>Otsikko</Form.Label>
              <Form.Control
                value={title}
                type='text'
                onChange={({ target }) => setTitle(target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formGroupEmail'>
              <Form.Label>Sisältö</Form.Label>
              <Form.Control
                value={story}
                type='text'
                onChange={({ target }) => setStory(target.value)}
              />
            </Form.Group>

            <DropdownButton
              variant='light'
              id='dropdown-basic-button'
              title='VALITSE KAUPUNGINOSA'
              multiple={true}
            >
              {allDistricts.map((dist, i) => (
                <Dropdown.Item key={i} onClick={() => handleSetDistrict(dist)}>
                  {dist}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            {districts.map((dist, d) => (
              <p key={d}>
                {dist}&nbsp;
                <span onClick={() => handleDeleteDistrict(dist)}>X</span>
              </p>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectForm
