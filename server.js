require("dotenv").config()
const express = require("express")
const app = express()
const PORT = 3000
const reactViews = require("express-react-views")
const mongoose = require('mongoose');

app.set("view engine", "jsx");
app.engine("jsx", reactViews.createEngine());
app.use(express.urlencoded({ extended: false }));

// New

app.get("/logs/new", (req, res)=>{
    res.render('New')
})


app.listen(PORT,()=>{
    console.log('Running at port:', PORT)
})
