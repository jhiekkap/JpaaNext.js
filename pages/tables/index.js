import React, { useState, useEffect } from 'react'
import readXlsxFile from 'read-excel-file'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../index.css'
import { Container, Row } from 'react-bootstrap'
import axios from 'axios'
import ShowTable from './ShowTable'
import FileForm from './FileForm'
import EditForm from './EditForm'
import Nav from '../../components/nav'
import { cleanName, cleanFile } from '../../utils/helpers'
import { fetchTable, fetchAllTableNames } from '../../utils/fetchData'

const Tables = () => {
  const [tables, setTables] = useState([])
  const [tableName, setTableName] = useState('')
  const [currentTable, setCurrentTable] = useState([])
  const [cloneTables, setCloneTables] = useState([])
  const [toggleColumnsOrder, setToggleColumnsOrder] = useState([])
  const [edit, setEdit] = useState(false)
  const [findCell, setFindCell] = useState('')
  const [undoIndex, setUndoIndex] = useState(0)
  const [showTable, setShowTable] = useState('')

  useEffect(() => {
    fetchAllTableNames().then(allTables => {
      console.log('TABLES:Fetching all table names', allTables)
      setTables(allTables.filter(table => table !== 'Projects'))
    })
  }, [])

  const upDateCurrentTable = newCurrentTable => {
    setCurrentTable(newCurrentTable)
    if (cloneTables.length - 1 === undoIndex) {
      setCloneTables(cloneTables.concat([newCurrentTable]))
    } else {
      setCloneTables(
        cloneTables
          .filter((table, t) => t <= undoIndex)
          .concat([newCurrentTable])
      )
    }
    setUndoIndex(undoIndex + 1)
    console.log('HISTORY', cloneTables.length, 'TABLES')
  }

  const handleUploadFile = files => {
    console.log('UPLOAD FILE', files)
    setShowTable('')
    const file = files[0]
    const type = file.type
    const name = cleanName(file.name.split('.')[0])
    setTableName(name)
    if (type === 'text/csv') {
      /////JOS CSV
      console.log(type, name, file)
      const reader = new FileReader()

      reader.onload = e => {
        let text = e.target.result
        const cleanerCSV = cleanFile(text)
        createNewCurrentTable(cleanerCSV)
      }

      reader.readAsText(file)
    } else {
      ////////JOS JOKU MUU (EXCEL...)
      console.log('LOADING EXCEL...')
      readXlsxFile(file).then(rows => {
        console.log(rows)
        createNewCurrentTable(rows)
      })
    }
  }

  const createNewCurrentTable = table => {
    setCurrentTable(table)
    setCloneTables([table])
    const columns = table[0]
    columns && setToggleColumnsOrder(columns.map(col => true))
  }

  const handleSaveFile = async () => {
    console.log('TRYING TO SAVE')
    if (!tables.includes(tableName)) {
      if (
        window.confirm(
          `Do you really want to save this table ${tableName} to database?`
        )
      ) {
        const columns = currentTable[0].map((col, i) => ({
          name: cleanName(col),
          type: isNaN(currentTable[1][i]) ? 'varchar(256)' : 'int',
        }))
        const table = currentTable.slice(1)
        console.log('TABLE CONTENTS', table)
        try {
          const createResponse = await axios.post('api/create', {
            tableName,
            columns,
            table,
          })
          console.log(createResponse)

          fetchAllTableNames()
            .then(allTables => setTables(allTables))
            .then(() =>
              fetchTable(tableName).then(wholeTable => {
                setCurrentTable(wholeTable)
                setCloneTables([wholeTable])
                setToggleColumnsOrder(columns.map(() => true))
              })
            )
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      alert('Updating existing databases not yet possible.')
    }
  }

  return (
    <Container>
      <Nav />
      <FileForm
        handleSaveFile={handleSaveFile}
        handleUploadFile={handleUploadFile}
        tables={tables}
        fetchTable={fetchTable}
        currentTable={currentTable}
        setCurrentTable={setCurrentTable}
        setCloneTables={setCloneTables}
        setShowTable={setShowTable}
        showTable={showTable}
        tableName={tableName}
        setTableName={setTableName}
        setToggleColumnsOrder={setToggleColumnsOrder}
      />
      {currentTable.length > 0 && (
        <EditForm
          edit={edit}
          setEdit={setEdit}
          findCell={findCell}
          setFindCell={setFindCell}
          undoIndex={undoIndex}
          setUndoIndex={setUndoIndex}
          upDateCurrentTable={upDateCurrentTable}
          currentTable={currentTable}
          setCurrentTable={setCurrentTable}
          cloneTables={cloneTables}
        />
      )}
      <Row>
        <ShowTable
          currentTable={currentTable}
          edit={edit}
          upDateCurrentTable={upDateCurrentTable}
          toggleColumnsOrder={toggleColumnsOrder}
          setToggleColumnsOrder={setToggleColumnsOrder}
          findCell={findCell}
        />
      </Row>
    </Container>
  )
}

export default Tables
