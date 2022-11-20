'use strict'
const dotenv = require('dotenv');

dotenv.config();

const {PORT, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER, NODE_ENV} = process.env

const sqlEncrypt = process.env.ENCRYPT === "true";

module.exports = 
    {
        apiPort: PORT,
        env: NODE_ENV,
        server: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        pass:SQL_PASSWORD,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true
        }
    }
