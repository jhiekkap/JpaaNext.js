const con = require('../_connection')

module.exports = async (req, res) => {
  console.log(`SHOW TABLES`, new Date()) 
  try { 
    const result = await con.query('SHOW TABLES') 
    const allTables = result.map(table => table.Tables_in_kW8zfl2jBR)
    console.log('Tanles in database:', allTables) 
    await res.json(allTables)
  } catch (error) {
    res.send(error)
    console.log(error)
  } /* finally {
    await con.close()
  } */
}
