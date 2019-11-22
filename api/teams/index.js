module.exports = (req, res) => {
    const { name } = req.body || { name:'Pelikarhut'}
    res.send(
      `This response would create a new team called ${name}, using a POST request.`
    )
  }