const express = require('express');
const router = express.Router();
const Joi = require('joi');

const monsterService = require('./monster.service');

// routes
router.get('/', allMonsters)
router.get('/:id', monsterData)
router.post('/create-update-array/:id', create_update_array)
router.post('/delete-array/:id', delete_array)
router.post('/create-update/:id', create_update);
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

function delete_array(req, res, next) {
    monsterService.delete_array(req.params.id, req.body)
        .then((msg) => res.json(msg))
        .catch(next);
}

function _delete(req, res, next) {
    monsterService.delete(req.session, req.params.id, req.body)
        .then((msg) => res.json(msg))
        .catch(next);
}

