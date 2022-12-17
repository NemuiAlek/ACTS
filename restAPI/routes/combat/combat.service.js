const { Sequelize } = require('sequelize');
const dbInfo = require('../../config')
const db = require('_helpers/db');
const bcrypt = require('bcryptjs');

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
    create_update_detail,
    deleteDetail,
    delete: _delete,
    updateHealth,
};


//getAll
async function getAll(params){
    let data
    try {
        data = await sequelize.query(`exec getSavedCombat ${params}`)
    } catch(err) {
        console.log(err)
    }
         
    return data[0]
        
    }


// getData
async function getData(id){

    let data

    try{
        data = await sequelize.query(`exec getAllDetail ${id}`)
    } catch(err){
        console.log(err)
    }

return data[0]
}

// Health update
async function updateHealth(params){

    let data

    try{
        data = await sequelize.query(`exec modifyHealth '${params.id}', '${params.modifier}', '${params.action}'`)
    } catch(err){
        console.log(err)
    }

return data[0]
}

// create-update
async function create_update(combID, params){

    let data 
        await sequelize.query(`exec createUpdateCombat '${params.userID}', '${combID}', '${JSON.stringify(params.data)}'`)
        .then((result)=>{
            data = result;
        })
        .catch((err)=>{
            data = err
        })
    

    return data[0][0]
    }

// create-update
async function create_update_detail(id, params){
    let data 
        await sequelize.query(`exec createUpateCombateDetail '${id}', '${params.action}', '${JSON.stringify(params)}'`)
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
async function deleteDetail(id, params){
    console.log(params)
    let data 
        await sequelize.query(`exec deleteCombatDetail '${id}' `)
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
async function _delete(monID, params){
    
        await sequelize.query(`exec deleteCombat '${monID}', '${params.user}'`)
        .then((result)=>{
            console.log(result);
        })
        .catch((err)=>{
            data = err
        })
    
        return "User deleted"
    }
