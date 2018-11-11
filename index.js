const express = require('express')
const mongoose = require('mongoose')
const keys = require('./keys')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const postRouter = require('./routes/post')
const clientPath = path.join(__dirname, 'client')
const port = process.env.PORT || 5000
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log(`MongoDB connect`))
  .catch((err) => console.log(err))
app.use(bodyParser.json())
app.use('/api/post', postRouter)
app.use(express.static(clientPath))

app.listen(port, () => {
  console.log(`Server start on port ${port}`)
})
