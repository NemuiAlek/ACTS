const bcrypt = require('bcryptjs');

const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Monster.findAll();
}

async function getById(id) {
    return await getMonster(id);
}

async function create(params) {
    // validate
    if (await db.Monster.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const monster = new db.Monster(params);
    
    // hash password
    monster.passwordHash = await bcrypt.hash(params.password, 10);

    // save monster
    await monster.save();
}

async function update(id, params) {
    const monster = await getMonster(id);

    // validate
    const emailChanged = params.email && monster.email !== params.email;
    if (emailChanged && await db.Monster.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    // copy params to monster and save
    Object.assign(monster, params);
    await monster.save();
}

async function _delete(id) {
    const monster = await getMonster(id);
    await monster.destroy();
}

// helper functions

async function getMonster(id) {
    const monster = await db.Monster.findByPk(id);
    if (!monster) throw 'Monster not found';
    return monster;
}
