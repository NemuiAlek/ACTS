const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const dbInfo = require('../../config')


const host = dbInfo.server;
const userName = dbInfo.user;
const password = dbInfo.pass;
const dbName = dbInfo.database
const dialect = 'mssql';

const sequelize = new Sequelize(dbName, userName, password, { host, dialect });

// routes


router.get('/', (req, res, next)=>{
    sequelize.query('exec test')
        .then((result)=>{
            res.json(result)
        })
        .catch((err)=>{
            res.json(err)
        })
});

module.exports = router;

