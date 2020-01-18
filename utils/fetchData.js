import axios from 'axios' 

export const fetchAllTableNames = async () => {
  console.log('fetching...')
  try {
    const body = await axios.get('api/all') 
    return body.data
  } catch (error) {
    console.error(error)
  }
} 

export const fetchTable = async table => {
  console.log('fetching...')
  try {
    const body = await axios.get('api/all/' + table)
    console.log('TABLET:', table, body.data)
    const { columns, rows } = body.data
    const wholeTable = [columns].concat(rows)
    return wholeTable
  } catch (error) {
    console.error(error)
  }
}
