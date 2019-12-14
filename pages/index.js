import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../index.css'
import Checkbox from '@material-ui/core/Checkbox'
//import { makeStyles } from '@material-ui/core/styles' 
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Button,
  Container,
  Col,
  Row,
  Table,
  Dropdown,
  DropdownButton,
  //Collapse,
} from 'react-bootstrap'
import { TextField } from '@material-ui/core'
//import { object } from 'prop-types'
import { fetchTable, fetchAllTableNames } from '../utils/fetchData'

/* const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  menu: {
    width: 200,
  },
})) */

const Home = () => {
  const [state, setState] = useState({
    Keskusta: true,
    Loutti: true,
    Pajala: true,
    Pöytäalho: true,
    Jamppa: true,
    Isokytö: true,
    Nummenkylä: true,
    Hinta: true,
    Hinta2: true,
    Rvuosi: true,
    Rvuosia: true,
    Rvuosil: true,
    '1h': true,
    '2h': true,
    '3h': true,
    '4h': true,
    //4h+: true,
  })

  const [tables, setTables] = useState([])
  const [table, setTable] = useState([])
  const [hinta1, setHinta1] = useState(0)
  const [hinta2, setHinta2] = useState(0)
  const [Rvuosia, setRvuosia] = useState([])
  const [Rvuosil, setRvuosil] = useState([])

  /* const [filter, setFilter] = useState({
    district: false,
    price: false,
  }) */

  useEffect(() => {
    fetchAllTableNames().then(allTables => {
      console.log('AAAALLLLL TABLEES', allTables)
      setTables(allTables)
    })
  }, [])

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked })
  }

  return (
    <Container>
    <div>
      <Head>
        <title>JPAA</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Nav />

      <div>
        <div>
          <form>
            <label>
              <DropdownButton
                variant='light'
                id='dropdown-basic-button'
                title='CHOOSE TABLE'
              >
                {tables.map((table, i) => (
                  <Dropdown.Item
                    key={i}
                    onClick={() => {
                      fetchTable(table)
                        .then(data => setTable(data))
                        .catch(error => console.error(error))
                    }}
                  >
                    {table}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </label>
          </form>
        </div>
        <td>Syötä hinta</td>
        <div className='row'>
          <TextField
            id='Hinta'
            type='text'
            value={hinta1}
            onChange={({ target }) => {
              console.log(target.value)
              setHinta1(target.value)
            }}
          ></TextField>
          <p>000 - </p>
          {/* <TextField id='Hinta2' type='Hinta2' inputProps={'Hinta2'}></TextField> */}
          <TextField
            id='Hinta'
            type='text'
            value={hinta2}
            onChange={({ target }) => {
              console.log(target.value)
              setHinta2(target.value)
            }}
          ></TextField>
          <p>000</p>
        </div>
        <div>
          <td>Syötä Rakennusvuosi</td>
          <div className='row'>
            <TextField
              value={Rvuosia}
              onChange={({ target }) => {
                console.log(target.value)
                setRvuosia(target.value)
              }}
            ></TextField>
            <TextField
              value={Rvuosil}
              onChange={({ target }) => {
                console.log(target.value)
                setRvuosil(target.value)
              }}
            ></TextField>
          </div>
        </div>

        <div>
          <table>
            <tr>
              <td>Keskusta</td>
              <Checkbox
                checked={state.Keskusta}
                onChange={handleChange('Keskusta')}
                value='Keskusta'
                inputProps={{
                  'aria-label': 'Keskusta checkbox',
                }}
              />
              <td>Loutti</td>
              <Checkbox
                checked={state.Loutti}
                onChange={handleChange('Loutti')}
                value='Loutti'
                inputProps={{
                  'aria-label': 'Loutti checkbox',
                }}
              />
              <td>Pajala</td>
              <Checkbox
                checked={state.Pajala}
                onChange={handleChange('Pajala')}
                value='Pajala'
                inputProps={{
                  'aria-label': 'Pajala checkbox',
                }}
              />
              <td>Pöytäaho</td>
              <Checkbox
                checked={state.Pöytäalho}
                onChange={handleChange('Pöytäalho')}
                value='Pöytäalho'
                inputProps={{
                  'aria-label': 'Pöytäalho checkbox',
                }}
              />
              <td>Jamppa</td>
              <Checkbox
                checked={state.Jamppa}
                onChange={handleChange('Jamppa')}
                value='Jamppa'
                inputProps={{
                  'aria-label': 'Jamppa checkbox',
                }}
              />
              <td>Isokytö</td>
              <Checkbox
                checked={state.Isokytö}
                onChange={handleChange('Isokytö')}
                value='Isokytö'
                inputProps={{
                  'aria-label': 'Isokytö checkbox',
                }}
              />
              <td>Nummenkylä</td>
              <Checkbox
                checked={state.Nummenkylä}
                onChange={handleChange('Nummenkylä')}
                value='Nummenkylä'
                inputProps={{
                  'aria-label': 'Nummenkylä checkbox',
                }}
              />
            </tr>
          </table>
        </div>
        <div>
          <table>
            <tr>
              <td>1h</td>
              <Checkbox
                checked={state['1h']}
                onChange={handleChange('1h')}
                value='1h'
                inputProps={{
                  'arian-label': '1h',
                }}
              />
              <td>2h</td>
              <Checkbox
                checked={state['2h']}
                onChange={handleChange('2h')}
                value='2h'
                inputProps={{
                  'arian-label': '2h',
                }}
              />
              <td>3h</td>
              <Checkbox
                checked={state['3h']}
                onChange={handleChange('3h')}
                value='3h'
                inputProps={{
                  'arian-label': '3h',
                }}
              />
              <td>4h</td>
              <Checkbox
                checked={state['4h']}
                onChange={handleChange('4h')}
                value='4h'
                inputProps={{
                  'arian-label': '4h',
                }}
              />
            </tr>
          </table>
        </div>
        <Table>
          <tbody>
            {table.length > 0 &&
              table
                .filter((row, r) => {
                  //const hinta = row[6]
                  //for (let [Hinta, Hinta2] of object.entries(state)) {
                  //console.log(`${Hinta}: ${Hinta2}`);
                  //if (hinta < Hinta && hinta > Hinta2 ) {
                  //return true
                  //}
                  //}
                  //console.log(state.Keskusta)
                  const alue = row[1]
                  //console.log(alue)
                  //console.log(state)
                  for (let [key, value] of Object.entries(state)) {
                    //console.log(`${key}: ${value}`)
                    if (key === alue && value) {
                      return true
                    }
                  }
                })
                .filter((row, r) => {
                  const hinta = row[6]
                  if (hinta1 === '' || hinta2 === '') {
                    return true
                  } else if (hinta2 === 0) {
                    if (hinta >= hinta1 * 1000) {
                      return true
                    } else {
                      return false
                    }
                  } else if (hinta1 === '') {
                    if (hinta <= hinta2 * 1000) {
                      return true
                    } else {
                      return false
                    }
                  } else {
                    if (hinta >= hinta1 * 1000 && hinta <= hinta2 * 1000) {
                      return true
                    } else {
                      return false
                    }
                  }
                })
                .filter((row, r) => {
                  const Rvuosi = row[9]
                  if (
                    Rvuosia === '' ||
                    Rvuosil === '' ||
                    Rvuosi >= Rvuosia ||
                    Rvuosi <= Rvuosil ||
                    (Rvuosi >= Rvuosia && Rvuosi <= Rvuosil)
                  ) {
                    return true
                  } else {
                    return false
                  }
                })
                .filter((row, r) => state[row[3]])
                .map((row, r) => (
                  <tr key={r}>
                    {row.map((col, c) => (
                      <td key={c}> {col}</td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </Table>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </div>
    </Container>
  )
}
export default Home
