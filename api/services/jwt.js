'use strict'

var jwt = require('jwt-simple');
/*dentro de payload fecha de 
creacion y expiracion del token
*/
var moment = require('moment');

var secret = 'claveSecretaCruso';

exports.createToken = function(user){
    var payLoad = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };

    return jwt.encode(payLoad, secret);
};