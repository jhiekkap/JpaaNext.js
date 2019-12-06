module.exports = async (req, res) => {
  var mysql = require('mysql')
  console.log(`SHOW TABLES`, new Date())
  const options = {
    host: 'remotemysql.com',
    port: '3306',
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: 'kW8zfl2jBR',
  }
  const { tableName, columns, table } = req.body
  //console.log('CREATE TABLE', newTableName, columns, table)
  const sql = `CREATE TABLE ${tableName} (ID int NOT NULL AUTO_INCREMENT, ${columns
    .map(col => `${col.name} ${col.type}`)
    .join(',')}, PRIMARY KEY (ID))`
  console.log(sql)
  //console.log(table)
  try {
    const con = await mysql.createConnection(options)
    con.query(sql, function(err, result, fields) {
      //if (err) throw err
      console.log('TABLE CREATED', result)
    })
    table.forEach(row => {
      const sql = `INSERT INTO ${tableName} (${columns
        .map(col => col.name)
        .join(',')}) VALUES (${columns.map(col => '?').join(',')})`
      //console.log(sql)
      con.query(
        sql,
        row.map(cell => (isNaN(cell) ? cell : parseInt(cell)))
      )
    })

    if (con) con.end()
    res.send('new table succesfully saved to database')
  } catch (error) {
    res.send(error)
    console.log(error)
  }
}
