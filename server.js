require("dotenv").config()
const express = require("express")
const app = express()
const PORT = 3000
const reactViews = require("express-react-views")
const mongoose = require('mongoose');

app.set("view engine", "jsx");
app.engine("jsx", reactViews.createEngine());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
});

// New

app.get("/logs/new", (req, res)=>{
    res.render('New')
})

// Create
app.post("/logs", (req, res) => {
    req.body.shipIsBroken = req.body.shipIsBroken === "on" ? true : false;
    res.send(req.body);
})

app.listen(PORT,()=>{
    console.log('Running at port:', PORT)
})
