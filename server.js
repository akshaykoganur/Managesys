const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const path = require('path'); //it is already installed no need to install it separately
dotenv.config({path:'config.env'})

const connectDB = require("./server/database/connection");

const port = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs");
//app.set("views",path.resolve(__dirname,"views/ejs"));

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

//load routers
app.use('/', require('./server/routes/router'));

app.listen(3000,()=>{console.log(`Server is running on http://localhost:${port}`)});