const session = require('express-session')

const SQLiteStore = require('connect-sqlite3')(session)

const config = require('../security.json')


module.exports = session({
    secret: config['session-secret'],
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({db: 'sessions',dir:'./db_store',table: 'sessions'})
})