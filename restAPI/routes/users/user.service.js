const bcrypt = require('bcryptjs');

const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    inUse,
    logIn
};

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
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
        if (params.username === '' || params.password === '') {
            return "BLANK FIELD";
        }
       
        let result = ''
        let loggedUser

        await
        db.User.findOne({ where: { userName: params.userName } })
          .then(resultFromDB => {
            if (resultFromDB === null) {
                console.log('im here!')
                result = "Username/Email not found";
            } else if (bcrypt.compareSync(params.password, resultFromDB.passwordHash)) {
              loggedUser = resultFromDB;
              result = "successfully logged in";
            } else {
              result = "username password combination not correct"
            }
          })
          .catch(error => console.log(error));

        return [result,loggedUser]
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
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const emailChanged = params.email && user.email !== params.email;
    if (emailChanged && await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}
