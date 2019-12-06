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

  const {
    query: { table },
  } = req
  console.log(table) 
  console.log(`SELECT * FROM  ${table} at`, new Date())
  try {
    const con = await mysql.createConnection(options)
    /*  const result = await con.query(`SELECT * FROM ${table}`, null)
       console.log(result) */

    con.query(`SELECT * FROM ${table}`, function(err, result, fields) {
      //if (err) throw err
      if (table === 'Projects') {
        res.json(result)
        console.log('JSONI', result)
      } else {
        const columns = fields.map(field => field.name)
        const rows = []
        //console.log(result)
        result.forEach(row => {
          let values = []
          for (let [key, value] of Object.entries(row)) {
            // console.log(`${key}: ${value}`);
            values.push(value)
          }
          rows.push(values)
        })
        console.log('ROWS', rows)
        console.log(result.length, 'ROWS', columns.length, 'COLUMNS:')
        res.json({ columns, rows })
      }
    })
    if (con) con.end()
  } catch (error) {
    res.send(error)
    console.log('error: ', error)
  }
}
