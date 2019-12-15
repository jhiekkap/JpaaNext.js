import axios from 'axios'
//const endpoint = 'http://localhost:3001/'
const endpoint = 'api/'

export const fetchAllTableNames = async () => {
  console.log('fetching .....')
  try {
    const body = await axios.get(endpoint + 'all') 
    return body.data
  } catch (error) {
    console.error(error)
  }
} 

export const fetchTable = async table => {
  console.log('fetching .....')
  try {
    const body = await axios.get(endpoint + 'all/' + table)
    console.log('TABLET:', table, body.data)
    const { columns, rows } = body.data
    const wholeTable = [columns].concat(rows)
    return wholeTable
  } catch (error) {
    console.error(error)
  }
}
