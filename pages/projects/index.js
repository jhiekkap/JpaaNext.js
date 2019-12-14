import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../index.css'
import { Container, Row, Col, Table, Card, ListGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../index.css"
import Nav from '../../components/nav'
import MeterForm from './MeterForm'
import ProjectForm from './ProjectForm'
//import { projectTemplates } from '../utils/projectTemplate'
import { fetchTable, fetchAllTableNames } from '../../utils/fetchData'

const Projects = () => {
  const [tables, setTables] = useState([])
  //const [projects, setProjects] = useState(projectTemplates)
  const [projects, setProjects] = useState([])
  const [uploadedTables, setUploadedTables] = useState([])

  useEffect(() => {
    const fetchJSON = async () => {
      const body = await axios.get('/api/all/Projects')
      const jsonProjects = JSON.parse(body.data[0].Jsoni)
      console.log('Projects as JSON', jsonProjects)
      setProjects(jsonProjects)

      const tablesOfProjects = [
        ...new Set(
          [].concat(
            jsonProjects.map(project => [
              ...new Set(project.meters.map(meter => meter.table)),
            ])
          )
        ),
      ]
        .map(table => table[0])
        .filter(table => table)
      console.log('Tables of projects', tablesOfProjects)

      tablesOfProjects.forEach(table => {
        fetchTable(table).then(wholeTable => {
          setUploadedTables(
            uploadedTables.concat({ name: table, content: wholeTable })
          )
        })
      })
    }

    fetchAllTableNames().then(allNames => {
      console.log('ALL NAMES', allNames)
      setTables(allNames.filter(table => table !== 'Projects'))
      fetchJSON()
    })
  }, [])

  const districtsAverageValue = (district, meter) => {
    //console.log('DISTRICT, METER', district,  meter)
    const table = uploadedTables.find(table => table.name === meter.table)
      .content
    const valueCol = table[0].indexOf(meter.col)
    const distCol = table[0].indexOf('Kaupunginosa')

    const myValues = table
      .filter(row => row[distCol] === district)
      .map((row, r) => row[valueCol])
    const allDistricts = [
      ...new Set(table.map((row, r) => r > 0 && row[distCol])),
    ].filter(dist => typeof dist === 'string')
    const allDistrictsGrouped = allDistricts.map(dist =>
      table.filter(row => row[distCol] === dist)
    )

    const mySum = myValues
      .map(value => (meter.number ? value : meter.points.indexOf(value)))
      .reduce((a, b) => a + b)

    const distAVG = mySum / myValues.length
    const max = Math.max(
      ...myValues.map(value =>
        meter.number ? value : meter.points.indexOf(value)
      )
    )
    return { distAVG, valueCol, allDistrictsGrouped, max }
  }

  const pointsOfMeter = (district, meter) => {
    const { distAVG, valueCol, allDistrictsGrouped } = districtsAverageValue(
      district,
      meter
    )
    const allAVGs = allDistrictsGrouped.map(
      dist =>
        dist
          .map(row =>
            meter.number ? row[valueCol] : meter.points.indexOf(row[valueCol])
          )
          .reduce((a, b) => a + b) / dist.length
    )
    const allAVG = allAVGs.reduce((a, b) => a + b) / allAVGs.length
    const points = (distAVG / allAVG) * meter.importance

    return { allAVG, points }
  }

  const pointsOfDistrict = (project, district) => {
    if (project.meters.length > 0) {
      console.log('Project meters:', project.meters)
      const pointsList = project.meters.map(
        meter => pointsOfMeter(district, meter).points
      )
      return pointsList.reduce((a, b) => a + b)
    } else {
      console.log('BBBBBBBBBBB')
      return 0
    }
  }

  const handleShowMeter = (projectID, meterID) => {
    const cloneProjects = [...projects]
    cloneProjects[projectID].meters[meterID].show = !cloneProjects[projectID]
      .meters[meterID].show
    setProjects(cloneProjects)
  }

  const handleShowProject = projectID => {
    const cloneProjects = [...projects]
    cloneProjects[projectID].show = !cloneProjects[projectID].show
    setProjects(cloneProjects)
  }

  const handleDeleteMeter = (projectID, meterID) => {
    const cloneProjects = [...projects]
    cloneProjects[projectID].meters = cloneProjects[projectID].meters.filter(
      (meter, i) => i !== meterID
    )
    setProjects(cloneProjects)
    axios
      .put('http://localhost:3001/projects', cloneProjects)
      .then(res => console.log(res))
      .catch(error => console.error(error))
  }

  const handleDeleteProject = projectID => {
    const cloneProjects = [...projects].filter((project, i) => i !== projectID)

    setProjects(cloneProjects)
    axios
      .put('http://localhost:3001/projects', cloneProjects)
      .then(res => console.log(res))
  }

  return (
    <Container>
      <Nav />
      <Row className='center'>
        <Col>
          <ProjectForm projects={projects} setProjects={setProjects} />
        </Col>
      </Row>
      <Row>
        {uploadedTables.length > 0 &&
          projects.length > 0 &&
          projects.map((project, p) => (
            <Card key={p} style={{ width: '36rem', marginTop: '1rem' }}>
              {/*  <Card.Img variant='top' src='holder.js/100px180' /> */}
              <Card.Body>
                <Card.Title className='center'>
                  <span onClick={() => handleShowProject(p)}>
                    {project.title}
                  </span>
                  &nbsp;
                  <span
                    onClick={() => {
                      if (
                        window.confirm('Haluatko varmasti poistaa hankkeen?')
                      ) {
                        handleDeleteProject(p)
                      }
                    }}
                  >
                    POISTA
                  </span>
                  &nbsp;
                  <span>
                    <ProjectForm
                      edit={true}
                      projects={projects}
                      setProjects={setProjects}
                      project={project}
                      projectID={p}
                    />
                  </span>
                </Card.Title>
                {project.show && (
                  <div>
                    <Card.Text className='center'>
                      {project.story}
                      <br />
                      VERTAILUSSA: <br />
                    </Card.Text>

                    <span className='center'>
                      {project.districts 
                      .sort((a, b) => {
                        const A = pointsOfDistrict(project, a)
                        const B = pointsOfDistrict(project, b)
                        return A > B ? -1 : B > A ? 1 : 0
                      })
                      .map(
                        dist =>
                          dist +
                          ': ' +
                          pointsOfDistrict(project, dist).toFixed(2) +
                          '  '
                      )}
                    </span>
                    <br />
                    <h6 className='center'>MITTARIT:</h6>
                    {project.meters &&
                      project.meters.map((meter, m) => (
                        <ListGroup className='center' key={m} variant='flush'>
                          <ListGroup.Item>
                            <span onClick={() => handleShowMeter(p, m)}>
                              {meter.title}{' '}
                            </span>
                            {meter.show && (
                              <Col>
                                <span>
                                  <MeterForm
                                    className='center'
                                    edit={true}
                                    projectID={p}
                                    meterID={m}
                                    meter={meter}
                                    projects={projects}
                                    setProjects={setProjects}
                                    tables={tables}
                                  />
                                </span>
                                <span onClick={() => handleDeleteMeter(p, m)}>
                                  {'      '}POISTA
                                </span>
                                <Table striped bordered hover>
                                  <thead>
                                    <tr>
                                      <td>ALUE</td>
                                      <td>ALUEEN KA / JÄRVENPÄÄN KA</td>
                                      <td>PISTEET</td>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {project.districts
                                    .sort((a, b) => {
                                      const A = pointsOfMeter(a, meter)
                                      const B = pointsOfMeter(b, meter)
                                      return A > B ? -1 : B > A ? 1 : 0
                                    })
                                    .map((dist, d) => (
                                      <tr key={d}>
                                        <td>{dist}</td>
                                        <td>
                                          {districtsAverageValue(
                                            dist,
                                            meter
                                          ).distAVG.toFixed(2)}
                                          {meter.number && meter.unit} /{' '}
                                          {pointsOfMeter(
                                            dist,
                                            meter
                                          ).allAVG.toFixed(2)}
                                          {meter.number && meter.unit}{' '}
                                        </td>
                                        <td>
                                          {pointsOfMeter(
                                            dist,
                                            meter
                                          ).points.toFixed(5)}{' '}
                                          / 1
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              </Col>
                            )}
                          </ListGroup.Item>
                        </ListGroup>
                      ))}
                    <MeterForm
                      edit={false}
                      className='center'
                      projectID={p}
                      projects={projects}
                      setProjects={setProjects}
                      tables={tables}
                    />
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
      </Row>
    </Container>
  )
}

export default Projects
