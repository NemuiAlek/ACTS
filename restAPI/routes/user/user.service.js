const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const db = require('_helpers/db');

module.exports = {
    create,
    update,
    delete: _delete,
    inUse,
    logIn,
    serialize,
};

function serializeTheUserObject(userObj){
    let result = {}
    if(userObj.id) result.id = userObj.id
    if(userObj.userName) result.userName = userObj.userName;
    if(userObj.email) result.email = userObj.email;

    return result;
  }

async function inUse(params) {
     if (await db.User.findOne({ where: { email: params.email } }) !== null){
        return 'Email already in use.'
     }else if (await db.User.findOne({ where: { userName: params.userName } }) !== null){
        return 'Username already in use.'
     }else{
        return 'Pass'
     }
    }

async function logIn(params) {       
        let result = ''
        let loggedUser

        if (params.userName === '' || params.password === '') {
            result = "Username/Password cannot be blank";
        } else {
        await
        db.User.findOne({ where:{
                            [Op.or]:
                                [
                                    { userName: params.userName },
                                    { email: params.userName }
                                ]}
                        })
          .then(resultFromDB => {
            if (resultFromDB === null) {
                result = "Username/Email not found";
            } else if (bcrypt.compareSync(params.password, resultFromDB.passwordHash)) {
              loggedUser = resultFromDB;
              result = "Successfully logged in";
            } else {
              result = "Username password combination not correct"
            }
          })
          .catch(error => console.log(error));
        }
        return [result,loggedUser]
      }
    
async function serialize(session) {

    let result

    if(!session.currentlyLoggedIn){
        return result = false
    } else { await
        db.User.findOne({where: {id: session.currentlyLoggedIn.id}} )
        .then((theUser)=>{
            result = serializeTheUserObject(theUser)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return result
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    //prevent admin users
    params.role = 'user'

    const user = new db.User(params);
    
    // hash password
    user.passwordHash = await bcrypt.hash(params.password, 10);

    // save user
    await user.save();

    await logIn(user)
}

async function update(session, id, params) {
    const user = await getUser(id);
    let passCompare

    const emailChanged = params.email && user.email !== params.email;
    const userChanged = params.userName && user.userName !== params.userName;

    // validate
    if(!session.currentlyLoggedIn){
        throw 'No session found, please log in'
    } 
    
    if (session.currentlyLoggedIn.id != id){
        throw 'Session ID does not match request ID'
    }


    if (emailChanged && await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }


    if (userChanged && await db.User.findOne({ where: { userName: params.userName } })) {
        throw 'Username "' + params.userName + '" is already registered';
    }


    if (params.newPass !== undefined) {
        if (bcrypt.compareSync(params.currentPass, user.passwordHash)){
            user.passwordHash = await bcrypt.hash(params.newPass, 10);
        } else {
            passCompare = false
        }
    }

    if (passCompare === false){
        throw 'Current password is incorrect'
    }


    // copy params to user and save
    Object.assign(user, {userName: params.userName, email: params.email});
    await user.save();

    return 'User Updated'
}

async function _delete(session, id, params) {
    const user = await getUser(id);

    if(!session.currentlyLoggedIn){
        throw 'No session found, please log in'
    } 
    
    if (session.currentlyLoggedIn.id != id){
        throw 'Session ID does not match request ID'
    }

    if(!bcrypt.compareSync(params.currentPass, user.passwordHash)){
        throw "Incorrect Password"
    }

    await user.destroy();

    return "User deleted"
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}
