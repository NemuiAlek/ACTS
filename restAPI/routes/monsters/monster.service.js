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

// Export Functions
module.exports = {
    getAll,
    getData,
    create_update,
    delete: _delete,
};

//getAll
async function getAll(){
    
    let data 
        await sequelize.query(`exec getAll`)
        .then((result)=>{
            data = result[0]
        })
        .catch((err)=>{
            data = err
        })
        
    return data
    }

// getData
async function getData(id){
let data 
    await sequelize.query(`exec getMonsterData ${id}`)
    .then((result)=>{
        console.log(result);
        data = result[0][0];
    })
    .catch((err)=>{
        data = err
    })

return data
}

// create-update
async function create_update(id, params){
    let data 
        await sequelize.query(`exec test '${id}', '${JSON.stringify(params)}'`)
        .then((result)=>{
            console.log(result);
            data = 'check SQL lol';
        })
        .catch((err)=>{
            data = err
        })
    
    return data
    }

// delete
async function _delete(id){

        await sequelize.query(`exec deleteMonster ${id}`)
        .then((result)=>{
            console.log(result);
        })
        .catch((err)=>{
            data = err
        })
    
    return 'Monster deleted'
    }

