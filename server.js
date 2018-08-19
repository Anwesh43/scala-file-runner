const express = require('express')
const server = express()
const path = require('path')
const port = 8090
server.use('/app', require('./router'))
server.use(express.static(path.join(__dirname, 'public')))
server.listen(port, () => {
    console.log(`listening on port ${port}`)
})
