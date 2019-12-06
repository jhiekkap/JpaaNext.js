import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Row, Form, DropdownButton, Dropdown } from 'react-bootstrap'

const FileForm = ({
  handleSaveFile,
  handleUploadFile,
  tables,
  fetchTable,
  currentTable,
  setCurrentTable,
  setCloneTables,
  setShowTable,
  showTable,
  tableName,
  setTableName,
  setToggleColumnsOrder, 
}) => {
  const MyDropzone = () => {
    const onDrop = useCallback(acceptedFiles => {
      handleUploadFile(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    })
    return (
      <div  id='uploadedFile' {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <Button variant='light' >
          UPLOAD
        </Button>
        )}
      </div>
    )
  }

  return (
    <Row>
      {tables && (
        <DropdownButton
          variant='light'
          id='dropdown-basic-button'
          title={!showTable ? 'VALITSE TAULU' : showTable}
        >
          {tables.map((table, i) => (
            <Dropdown.Item
              key={i}
              onClick={() => { 
                setShowTable(table)
                setTableName(table)
                fetchTable(table).then(wholeTable => {
                  setCurrentTable(wholeTable)
                  setCloneTables([wholeTable])
                  setToggleColumnsOrder(wholeTable[0].map(col => true))
                })
              }}
            >
              {table}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      )}
      <MyDropzone /> 
      {tableName && (
        <Form inline={true}>
          <Form.Control
            type='text'
            // placeholder='tableName'
            value={tableName}
            onChange={({ target }) => setTableName(target.value)}
          />
        </Form>
      )}
      {currentTable && currentTable.length > 0 && (
        <Button variant='light' onClick={handleSaveFile}>
          SAVE
        </Button>
      )}
    </Row>
  )
}

export default FileForm
