'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');
var md_auth = require('../middleware/authenticated');

var api = express.Router();

var multipart = require('connect-multiparty');//subida de ficheros
var md_upload = multipart({uploadDir : './uploads/album'});

api.get('/album/:id', md_auth.ensureAuth, AlbumController.getAlbum);
api.post('/album', md_auth.ensureAuth, AlbumController.crearAlbum);
api.get('/albums/:artist?', md_auth.ensureAuth, AlbumController.getAlbums);
api.put('/album/:id', md_auth.ensureAuth, AlbumController.actualizarAlbum);
api.delete('/album/:id', md_auth.ensureAuth, AlbumController.deleteAlbum);

module.exports = api;