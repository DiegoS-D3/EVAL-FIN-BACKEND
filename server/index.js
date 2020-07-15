console.log('NODE.js')

var http = require('http')
var express = require('express')
var Routing = require('./requestRouting')

var port = 8082
var app = express()

//CREACION DEL SERVER
var Server = http.createServer(app)

//LANZAMOS EL SERVIDOR 
//ASIGNAMOS UN CALLBACK UNA VEZ QUE SE LANCE EL SERVIDOR
Server.listen(port,function(){
    console.log('servidor ejecutandose en el puerto: ' + port)
})

