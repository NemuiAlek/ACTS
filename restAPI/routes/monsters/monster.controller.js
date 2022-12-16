const express = require('express');
const router = express.Router();
const Joi = require('joi');

const monsterService = require('./monster.service');

// routes
router.get('/', allMonsters)
router.get('/:id', monsterData)
router.post('/create-update-array/:id', create_update_array)
router.post('/create-update-delete/:id', create_update_dete)
router.post('/create-update/:id', create_update);
router.put('/update/:id', update);
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
    monsterService.create_update(req.params.id, req.body)
        .then((msg) => res.json(msg))
        .catch(next);
}

function create_update_array(req, res, next) {
    monsterService.create_update_array(req.params.id, req.body)
        .then((msg) => res.json(msg))
        .catch(next);
}

function create_update_dete(req, res, next) {
    monsterService.create_update_dete(req.params.id, req.body)
        .then((msg) => res.json(msg))
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
