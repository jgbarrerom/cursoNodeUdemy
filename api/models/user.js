'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);
//se define el modelo del documento con JSON
var UserSchema = schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String
});
//para exportar el modelo con el nombre User, basado en el schema UserSchema
//el primer nombre lo pluraliza
module.exports = mongoose.model('User', UserSchema);