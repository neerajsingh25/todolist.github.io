const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'})

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("connection to mongo......"))
.catch((error)=> console.log("error")); 