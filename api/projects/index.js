const con = require('../_connection')

module.exports = async (req, res) => {  
  const updatedJSON = req.body
  console.log(`Updating projects`, updatedJSON, new Date())  
  try { 
    const sql = `UPDATE Projects SET Jsoni = (?) WHERE ID=1`
    console.log('UPDATE SQL', sql)
    const result = await con.query(sql, JSON.stringify(updatedJSON))
    console.log('Projects updated',result)
    res.send('Projects successfully updated') 
  } catch (error) {
    res.send(error)
    console.log(error)
  } finally {
    console.log('Closing connection')
    //await con.close()
  }
}
