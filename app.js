const path = require('path');


// env setup
require('dotenv').config();

// module setup
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const port = process.env.PORT || 3000;

// custom module 
const translateRoutes = require('./routes/translator');
const { error } = require('console');

// express setup
const app = express();



// Parser setup

app.use(express.json());

// COR setup

app.use(cors())

// Route setup

app.use('/main',translateRoutes);


// error handling 
app.use((err,req,res,next)=>{
    console.log(err);
    res.json({
        data:"",
        error:err.message
    })
})


// DB connection
mongoose.connect(process.env.DB_URL ,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("Connected to db");
})
.catch((err)=>{
    console.log(err);
})


// server setup 
app.listen(port , ()=>{
    console.log(`server is starting in port no ${port}`);
})

