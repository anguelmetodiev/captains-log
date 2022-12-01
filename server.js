require('dotenv').config()
const express = require('express')
const reactViews = require("express-react-views")
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const app = express()
const controller = require('./controllers/logs')
const PORT = 3000


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.once("open", () => {
  console.log("Connected to mongo")
})

app.set('view engine', 'jsx')
app.engine('jsx', reactViews.createEngine())

app.use((req, res, next) => {
  console.log("Middleware on all routes")
  next()
})
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static("public"))

app.get('/',(req,res)=>{
  res.redirect('/logs');
})

app.use('/logs', controller)

app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`)
})