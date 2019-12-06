module.exports = async (req, res) => {
  var mysql = require('mysql')
  console.log(`UPDATE PROJECTS`, new Date())
  const options = {
    host: 'remotemysql.com',
    port: '3306',
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: 'kW8zfl2jBR',
  }
  const updatedJSON = req.body

  try {
    const con = await mysql.createConnection(options)
    const sql = `UPDATE Projects SET Jsoni = (?) WHERE ID=1`
    console.log('UPDATE SQL', sql)
    con.query(sql, JSON.stringify(updatedJSON), (error, result, fields) => {
      //res.send('Projects JSON succesfully updated', result)
      console.log('UPDATE SQL', sql, result)
      if (error) console.error(error)
    })
    if (con) con.end()
  } catch (error) {
    res.send(error)
    console.log(error)
  }
}
