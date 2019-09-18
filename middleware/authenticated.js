'use strict'

var jwt = require('jwt-simple');
/*dentro de payload fecha de 
creacion y expiracion del token
*/
var moment = require('moment');

var secret = 'claveSecretaCruso';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La peticion no tiene la cabecera de autenticacion'});
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            res.status(401).send({message: 'El token ha expirado'});
        }
    } catch (ex) {
        console.log(ex);
        res.status(403).send({message: 'El token no es valido'});
    }

    req.user = payload;

    next();
};