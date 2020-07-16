console.log('NODE.js')

var bodyParser= require('body-parser'),
    http = require('http'),
    express = require('express'),

    router = require('./router')

var port = port = process.env.PORT || 3000,
    app = express(),
    Server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/router', router)
app.use(express.static('../public'))


//CREACION DEL SERVER
//LANZAMOS EL SERVIDOR 
//ASIGNAMOS UN CALLBACK UNA VEZ QUE SE LANCE EL SERVIDOR
Server.listen(port,function(){
    console.log('servidor ejecutandose en el puerto: ' + port)
})

