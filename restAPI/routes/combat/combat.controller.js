const express = require('express');
const router = express.Router();
const Joi = require('joi');

const combatService = require('./combat.service');

// routes
//Combat Section
router.get('/:id', userCombats)
router.post('/create-update/:id', create_update)
router.post('/delete/:id', _delete);

//Detail section
router.get('/detail/:id', combatData)
router.post('/detail/add/:id', create_update_detail)
router.post('/detail/health', updateHealth)
router.post('/detail/delete/:id', deleteDetail)


module.exports = router;

// route functions

function userCombats(req,res,next){
    combatService.getAll(req.params.id)
    .then((msg) => res.json(msg))
    .catch(next);
}

function combatData(req, res, next) {
    combatService.getData(req.params.id)
        .then((msg) => res.json(msg))
        .catch(next);

}

function create_update(req, res, next) {
    combatService.create_update(req.params.id, req.body)
        .then((msg) => res.json(msg))
        .catch(next);
}

function create_update_detail(req, res, next) {
    combatService.create_update_detail(req.params.id, req.body)
        .then((msg) => res.json(msg))
        .catch(next);
}

function deleteDetail(req, res, next) {
    combatService.deleteDetail(req.params.id)
        .then((msg) => res.json(msg))
        .catch(next);
}

function _delete(req, res, next) {
    combatService.delete(req.params.id, req.body)
        .then((msg) => res.json(msg))
        .catch(next);
}

function updateHealth(req, res, next) {
    combatService.updateHealth(req.body)
        .then((msg) => res.json(msg))
        .catch(next);
}

