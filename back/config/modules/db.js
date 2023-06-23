const config_db = require('../database.json')
const mariadb = require('mariadb')

const connexion_db = mariadb.createPool({
    host: config_db.host,
    user: config_db.user,
    password: config_db.password,
    database: config_db.database,
    connectionLimit : 5
  })
  


module.exports = connexion_db;