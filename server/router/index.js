var express = require('express')
const Storage = require('../storage')
var Router = express.Router()

Router.get('/search', (req,res)=>{
    Storage.getDataAll('data')
            .then((data)=>{
                res.json(data)
            }).catch((error)=>{
                res.sendStatus(500).json(error)
            })

})

module.exports = Router;