'use strict'

const express = require('express')
const app = express()
const router = require('./routes/index.js');
const morgan = require('morgan')
const cors = require('cors')
const { errorHandler } = require('./middlewares/errorHandler')

if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'))
app.use(cors())

app.use('/', router)
app.use(errorHandler)

app.listen(PORT, ()=>{
  console.log(`App listening on port ${PORT}`);
})