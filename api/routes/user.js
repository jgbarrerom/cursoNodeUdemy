'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middleware/authenticated');
var multipart = require('connect-multiparty');//subida de ficheros

var api = express.Router();

var md_upload = multipart({uploadDir : './uploads/users'});

api.get('/probando-controlador', UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth, UserController.updateUser);//actualizar recursos de la BD
api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload], UserController.uploadImages);//ruta para subir archivos
api.get('/get-image-user/:imageFile', UserController.getImageFile);//ruta para descarga archivo

module.exports = api;