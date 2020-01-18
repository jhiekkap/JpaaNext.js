const con = require('../_connection')

module.exports = (req, res) => { 
  const {
    query: { table },
  } = req
  console.log(`SELECT * FROM  ${table} at`, new Date())
  con
    .query(`SELECT * FROM ${table}`, function(err, result, fields) {
      if (err) throw err
      if (table === 'Projects') {
        res.json(result)
        console.log('PROJEKTI!')
      } else {
        const columns = fields.map(field => field.name)
        const rows = []
        result.forEach(row => {
          let values = []
          for (let [key, value] of Object.entries(row)) {
            // console.log(`${key}: ${value}`);
            values.push(value)
          }
          rows.push(values)
        })
        res.json({ columns, rows })
      }
    })
    //.then(() => con.close())
    .catch(error => {
      res.send(error)
      console.log('error: ', error)
    })
}
