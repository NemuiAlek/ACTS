const express = require('express');
const router = express.Router();
const Joi = require('joi');

const monsterService = require('./monster.service');

// routes
router.get('/', allMonsters)
router.get('/:id', monsterData)
router.post('/create-update/:id', create_update);
router.put('/update/:id', updateSchema, update);
router.post('/delete/:id', _delete);

module.exports = router;

// route functions

function allMonsters(req,res,next){
    monsterService.getAll()
    .then((msg) => res.json(msg))
    .catch(next);
}

function monsterData(req, res, next) {
    monsterService.getData(req.params.id)
        .then((msg) => res.json(msg))
        .catch(next);

}

function create_update(req, res, next) {
    monsterService.create(req.params.id, req.body)
        .then(() => res.json('check sql kekw'))
        .catch(next);
}

function update(req, res, next) {
    monsterService.update(req.session, req.params.id, req.body)
        .then((msg) => res.json(msg))
        .catch(next);

}

function _delete(req, res, next) {
    monsterService.delete(req.params.id)
        .then((msg) => res.json(msg))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        userName: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.User).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    console.log(req.body)
    const schema = Joi.object({
        userName: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        currentPass: Joi.string().min(6).empty(''),
        newPass: Joi.string().min(6).empty(''),
        confirmPass: Joi.string().valid(Joi.ref('newPass')).empty('')
    }).with('newPass', 'confirmPass');
    validateRequest(req, next, schema);
}
