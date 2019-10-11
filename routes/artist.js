'use strict'

var express = require('express');
var ArtistController = require('../controllers/artist');
var md_auth = require('../middleware/authenticated');

var api = express.Router();

api.get('/artist/:id', md_auth.ensureAuth, ArtistController.buscarUnArtista);
api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist);
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtist);
api.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist);

module.exports = api;