const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('./user.service');

// routes

router.get('/serialize', serialize)
router.post('/signup', createSchema, create);
router.post('/validate',inUse);
router.post('/login', logIn)
router.post('/logout', logOut)
router.put('/update/:id', updateSchema, update);
router.post('/delete/:id', _delete);

module.exports = router;

// route functions

function inUse(req, res, next) {
    userService.inUse(req.body)
        .then((msg) => res.json(msg))
        .catch(next);
}

function logIn(req, res, next) {
    userService.logIn(req.body)
        .then((msg) => {
            if(msg[0] === "Successfully logged in"){
                req.session.currentlyLoggedIn = msg[1]
                res.json(msg[0])
            } else {
                res.json(msg[0])
            }

        console.log(msg[0])
        })
        .catch(next);
}

function serialize(req, res, next) {
    userService.serialize(req.session)
        .then((msg) => {
            res.json(msg)
            console.log(msg)
        })
        .catch(next);
}

function logOut(req, res, next) {
    req.session.destroy(err => {
        if (err) console.log(err);
        res.json({message: "successfully logged out"});
      });
}

function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.session, req.params.id, req.body)
        .then((msg) => res.json(msg))
        .catch(next);

}

function _delete(req, res, next) {
    userService.delete(req.session, req.params.id, req.body)
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
