const connectToMongo = require('./db') ;
const express = require('express')

connectToMongo() ;
const app = express()
var cors = require('cors') ;

const port = 5000

app.use(express.json())
app.use(cors()) ;

// Available Routes 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use( '/api/auth', require('./routes/auth')) ;
app.use("/api/notes", require('./routes/Notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
