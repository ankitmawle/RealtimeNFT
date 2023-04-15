require('dotenv').config()
const mongoose = require('mongoose');
const fs = require('fs')
const express = require('express');
const expressEjsLayout = require('express-ejs-layouts')
const app = express();
mongoose.connect(process.env.MONGO_CLIENT,{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));
app.set('view engine','ejs');
app.use(expressEjsLayout);

app.use('/api',require('./routes/api'));
app.use('/',require('./routes/index'));
app.use('/mint',require('./routes/mint'));
app.use(express.static(__dirname +'/public'))
app.listen(process.env.PORT)