var fs = require('fs'),
    path = require('path')
const { resolve } = require('path')
const { rejects } = require('assert')

//OBJETO DE RETORNA LA DATA OBTENIDA DEL ARCHIVO data.json
module.exports = {
    getData: function(dataType){
        let dataPath = __dirname + path.join('/data/data.json')
        return new Promise((resolve, rejects) => {
            fs.readFile(dataPath, 'utf8', (err, readData) =>{
                if(err) rejects(err)
                resolve(JSON.parse(readData))
            })
        })
    }
}
