'use strict'

var express = require('express');
var SongController = require('../controllers/song');
var md_auth = require('../middleware/authenticated');

var api = express.Router();

api.get('/song/:id', md_auth.ensureAuth, SongController.getSong);
api.post('/song', md_auth.ensureAuth, SongController.saveSong);
api.get('/songs/:album?', md_auth.ensureAuth, SongController.getSongs);

module.exports = api;