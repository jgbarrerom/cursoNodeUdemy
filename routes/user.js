'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middleware/authenticated');

var api = express.Router();

//el segundo parametro es el middleware
api.get('/probando-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);

module.exports = api;