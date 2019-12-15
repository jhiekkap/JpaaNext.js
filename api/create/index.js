const con = require('../_connection')

module.exports = async (req, res) => { 
  const { tableName, columns, table } = req.body 
  console.log(`Creating table`, table, new Date())
  const tableSql = `CREATE TABLE ${tableName} (ID int NOT NULL AUTO_INCREMENT, ${columns
    .map(col => `${col.name} ${col.type}`)
    .join(',')}, PRIMARY KEY (ID))` 
  try {
    await con.query(tableSql)
    console.log('New table created')
    const rowSql = `INSERT INTO ${tableName} (${columns 
      .map(col => col.name)
      .join(',')}) VALUES ?`
    const values = table.map(row => row.map(cell => (isNaN(cell) ? cell : parseInt(cell))))
    await con.query(rowSql, [values]) 
    await res.send('New table succesfully saved to database')
  } catch (error) {
    await res.send(error)
    console.log(error)
  } finally {
    console.log('Closing connection')
    await con.close()
  }
}
