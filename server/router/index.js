
var  bodyParser = require('body-parser')
    ,http = require('http')
    ,express = require('express')
    ,Router = express.Router()
    ,jQuery = require('jquery')
    ,io = require('socket.io')
    ,Storage = require('../storage');


Router.get('/search', (req,res)=>{
    Storage.getData('data')
            .then((data)=>{
                res.json(data)
            }).catch((error)=>{
                res.sendStatus(500).json(error)
            })

})

Router.get("/ciudades", (req, res)=>{
    Storage.getData('ciudades')
            .then(ciudades=>{
              var ciudadesUnique = [];
              ciudades.forEach(function(o) {
                if(ciudadesUnique.indexOf(o.Ciudad) < 0){
                   ciudadesUnique.push(o.Ciudad);
                }
              })
              res.json(ciudadesUnique)
            })
            .catch(error=>{
              res.sendStatus(500).json(error);
            })
  })
  
  Router.get("/tipos", (req, res)=>{
    Storage.getData('tipos')
            .then(tipos=>{
              var tiposUnique = [];
              tipos.forEach(function(o) {
                if(tiposUnique.indexOf(o.Tipo) < 0){
                   tiposUnique.push(o.Tipo);
                }
              })
              res.json(tiposUnique)
            })
            .catch(error=>{
              res.sendStatus(500).json(error);
            })
  })

module.exports = Router;