const tedious = require('tedious');
const { Sequelize } = require('sequelize');

//const { dbName, dbConfig } = require('config.json');

const dbInfo = require('../config')
const dbName = dbInfo.database

const dbConfig = {
    "server": dbInfo.server,
    "options": {
        "port": 1433,
        "trustServerCertificate": true
    },
    "authentication": {
        "type": "default",
        "options": {
            "userName": dbInfo.user,
            "password": dbInfo.pass
        }
    }
}

module.exports = db = {};

initialize();

async function initialize() {
    const dialect = 'mssql';

    const host = dbInfo.server;
    const userName = dbInfo.user;
    const password = dbInfo.pass;

    // create db if it doesn't already exist
    await ensureDbExists(dbName);

    // connect to db
    const sequelize = new Sequelize(dbName, userName, password, { host, dialect });

    // init models and add them to the exported db object
    db.User = require('../routes/user/user.model')(sequelize);

    // sync all models with database
    await sequelize.sync({ alter: false });
}

async function ensureDbExists(dbName) {
    return new Promise((resolve, reject) => {
        const connection = new tedious.Connection(dbConfig);
        connection.connect((err) => {
            if (err) {
                console.error(err);
                reject(`Connection Failed: ${err.message}`);
            }

            const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
            const request = new tedious.Request(createDbQuery, (err) => {
                if (err) {
                    console.error(err);
                    reject(`Create DB Query Failed: ${err.message}`);
                }

                // query executed successfully
                resolve();
            });

            connection.execSql(request);
        });
    });
}

