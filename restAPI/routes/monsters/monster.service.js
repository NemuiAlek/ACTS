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
    create_update_array,
    create_update_dete,
    delete: _delete,
};

//getAll
async function getAll(){
    
    let data

    try {
        data = await sequelize.query(`exec getAll`)
    } catch(err) {
        console.log(err)
    }
         
    return data[0]
    }

// getData
async function getData(id){

    let data

    try{
        data = await sequelize.query(`exec getMonsterData ${id}`)
    } catch(err){
        console.log(err)
    }

    data[0][0].speed = JSON.parse(data[0][0].speed)
    data[0][0].skills = JSON.parse(data[0][0].skills)
    data[0][0].special_abilities = JSON.parse(data[0][0].special_abilities)
    data[0][0].actions = JSON.parse(data[0][0].actions)
    data[0][0].legendary_actions = JSON.parse(data[0][0].legendary_actions)

return data[0][0]
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

// create-update
async function create_update_array(id, params){
    let data 
        await sequelize.query(`exec createUpdateArray '${id}', '${JSON.stringify(params)}'`)
        .then((result)=>{
            console.log(result);
            data = 'Success!';
        })
        .catch((err)=>{
            data = err
        })
    
    return data
    }

// create-update
async function create_update_dete(id, params){
    console.log(params)
    let data 
        await sequelize.query(`exec deleteArray '${id}', '${JSON.stringify(params)}'`)
        .then((result)=>{
            console.log(result);
            data = 'Success!';
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

