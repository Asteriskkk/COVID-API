const csv=require('csvtojson')
const path = require('path')
const expObj = {}

expObj.getDataFromCSV = ()=>{
    return new Promise((resolve, reject)=>{
    //console.log(__dirname + '/../../')
    const fullDir = path.format({
        dir: `${path.dirname(require.main.filename)}/../Public`,
        base: `total_cases.csv`
      });
    
     // console.log(fullDir)
   // C:\Users\43833\Desktop\task\API
    csv()
    .fromFile(fullDir)
    .then((jsonObj)=>{
        resolve(jsonObj) 
    })
    .catch(err=>{
        reject(err)
    })
    })     
}



// const moment = require('moment')
// let d = moment('29/02/2020','DD/MM/YYYY').add(1, 'days')
// console.log(moment(d).format('DD/MM/YYYY'))

module.exports = expObj