const con = require('../_connection')

module.exports = async (req, res) => {  
  const updatedJSON = req.body
  console.log(`Updating projects`, updatedJSON, new Date())  
  try { 
    const sql = `UPDATE Projects SET Jsoni = (?) WHERE ID=1`
    console.log('UPDATE SQL', sql)
    const result = await con.query(sql, JSON.stringify(updatedJSON))
    console.log('Projects updated',result)
    await res.send('Projects successfully updated') 
    //await con.close()
  } catch (error) {
    await res.send(error)
    console.log(error)
  } /* finally { 
    await con.close()
  } */
}
