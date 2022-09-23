const fs = require('fs')

const path = './db/data.json'

const saveDatabase = (data) => {
    fs.writeFileSync(path, JSON.stringify(data));
}

const readDatabase = () => {
    if(! fs.existsSync(path)) return null
    return JSON.parse(fs.readFileSync(path, {encoding: 'utf-8'})); 
}

module.exports = {
    saveDatabase,
    readDatabase
}