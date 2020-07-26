const fsd = require('fs'),
    pathd = require('path');

//OBJETO DE RETORNA LA DATA OBTENIDA DEL ARCHIVO data.json
module.exports = {
    getData: (dataType) => {
        var self = this;
        let dataPath = pathd.join(__dirname, '/data/data.json');
        return new Promise((resolve, rejects) => {
            fsd.readFile(dataPath, 'utf8', (err, readData) =>{
                if(err) rejects(err)
                resolve(JSON.parse(readData))
            })
        })
    }
}
