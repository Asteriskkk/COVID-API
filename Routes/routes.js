"use strict";
//require('dotenv').config({path: __dirname + './../.env'})
const express = require('express');
const server = express();
const ApiHandler = require('../API/report')
const db = require("../DB/Connection");
const config = require(`./../config/config_${process.env.NODE_ENV}.json`)
const dbName = "covid";
const collectionName = "report";


db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
   // get all items
   dbCollection.find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);

      // << return response to client >>
   });

   // << db CRUD routes >>
   server.post("/items", (request, response) => {
     
      const item = request.body;
      ApiHandler.getDataFromCSV()
      .then(resp=>{
          for(let day of resp) {
            dbCollection.insertOne(day, (error, result) => { // callback of insertOne
                if (error) throw error;
                //console.log("data inserted")
             });
          }
          response.status(201)
          response.send({"message":`${resp.length} ${config.errroCode['201']}`})
      })
      .catch()

   });

   //getting object by date
   server.get("/items/:date", (request, response) => {
      console.log(JSON.stringify(process.env.NODE_ENV))
      const itemId = request.params.date;
      dbCollection.findOne({ date: itemId }, (error, result) => {
         if (error){
            response.status(500)
            response.send({'message':`${config.errroCode['500']}`,'status':'error'})
         }else{
             if(result){
                response.json(result);
             }else{
                 response.status(404)
                response.json({"message":`${config.errroCode['404']}`});
             }
         }
      });
   });

   server.get("/items", (request, response) => {
      // return updated list
      dbCollection.find().toArray((error, result) => {
         if (error){
            response.status(500)
            response.send({'message':`${config.errroCode['500']}`,'status':'error'})
         }else{
         response.status(200)
         response.json(result);
      }
      });
   });
}, function (err) { // failureCallback
   throw (err);
});

module.exports = server
