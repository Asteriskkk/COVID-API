"use strict";
const express 		= require('express');
const app 			= express();
const routes		= require('./Routes/routes');
//require('dotenv').config({path: __dirname + '/.env'})
const config = require(`./config/config_${process.env.NODE_ENV}.json`)
const port = process.env.PORT;
const body_parser = require("body-parser");



app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Pass to next layer of middleware
  next();
});

app.use(body_parser.json());
// Pass to child routes
app.use(routes)


//if not routes matches
app.use((req, res, next)=>{
  const error = new Error(config.errroCode['404'])
  error.status = 404
  next(error)
})


// handling errro
app.use(function(err, req, res, next) {
    res.status(err.status||500);
    res.json({
      error:{
        message:err.message
      }})
 });



 // listening port on 8000
app.listen(port, () => {
  console.log(`Server listening at ${port}`);
})


process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })

process.on('unCaughtException', function(err){
	console.log(err);
	process.exit(1);
});
