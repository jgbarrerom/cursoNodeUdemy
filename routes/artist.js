'use strict'

var express = require('express');
var ArtistController = require('../controllers/artist');
var md_auth = require('../middleware/authenticated');

var api = express.Router();

var multipart = require('connect-multiparty');//subida de ficheros
var md_upload = multipart({uploadDir : './uploads/artists'});

api.get('/artist/:id', md_auth.ensureAuth, ArtistController.buscarUnArtista);
api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist);
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtist);
api.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist);
api.post('/artist/upload-image-artist/:id',[md_auth.ensureAuth,md_upload], ArtistController.uploadImages);
api.get('/artist/get-image-artist/:imageFile', ArtistController.getImageFile);//ruta para descarga archivo


module.exports = api;