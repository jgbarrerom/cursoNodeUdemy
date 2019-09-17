'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var SongSchema = schema({
    order: Number,
    name: String,
    duration: String,
    file: Number,
    album: {type: schema.ObjectId, ref: 'Album'}
});

module.exports = mongoose.model('Song', SongSchema);