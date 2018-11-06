//Local imports
require('./config/config')

//module imports
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');

var app = express();
const port = process.env.PORT

app.use(bodyParser.json());

app.get('/health', (req, res) => {
  console.log("REQ Received");
  let resJson ={
    "status":"up", 
    "version":"1.0.0",
    "dbStatus": "",
    "date":(date)};
    
    // if (resJson.dbStatus === 200){
    //   console.log('OK')
    // }else{
    //   console.log('DB status not running')
    // }

    res.send(resJson)
});

app.get('/health/:id', (req, res) => {
  var id = req.params.id 

  if(!ObjectID.isValid(id)) {
    console.log('ID not valid');
  }
  
  Health.findById(id).then((health) => {
    if (!health) {
      return console.log(404).send();
    }

    health.findById(id).then((health) => {
      if (!health) {
        return res.status(404).send();
      }

      res.send({health});
    })
  }).catch((e) => {
    res.status(400).send();
  });
});



app.listen(port, () =>{
  console.log(`Started on port ${port}`)
})

//Date and time
var date;
date = new Date();
date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
    ('00' + date.getUTCHours()).slice(-2) + ':' + 
    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + date.getUTCSeconds()).slice(-2);
console.log(date);
module.exports = {app};