
 
module.exports = async (req, res) =>  {
    var mysql = require('mysql')
    console.log(`SHOW TABLES`, new Date())
    const options = {
        host: 'remotemysql.com',
        port: '3306',
        user: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        database: 'kW8zfl2jBR',
      }

    try {
      const con = await mysql.createConnection(options)
      con.query(`SHOW TABLES`, function(err, result, fields) {
        if (result) {
          const allTables = result.map(table => table.Tables_in_kW8zfl2jBR)
          console.log('TABLES IN THIS DATABASE:', allTables)
          res.json(allTables)
        }
      })
      if (con) con.end()
    } catch (error) {
      res.send(error)
      console.log(error)
    }
  }