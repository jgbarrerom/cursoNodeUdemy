'use strict'

var fs = require('fs');//para trabajar con ficheros
var path = require('path');//para trabajar con rutas
var bCrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');


function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando una accion del controlador de usuarios del API rest node y mongo'
    });
}

function saveUser(req, res){
    var user = new User();
    var params = req.body;//datos que llegan por post

    //console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';

    if(params.password){
        //encrptar y guardar datos
        bCrypt.hash(params.password, null, null ,function(err, hash){
            user.password = hash;
            if(user.name != null && user.surname != null && user.email != null){
                //guardar usuario
                user.save((err, userStored) => {
                    if(err){
                        res.status(500).send('Error al guardar el usuario');
                    }else{
                        if(!userStored){
                            res.status(404).send('No se ha registrado el usuario');
                        }else{
                            res.status(200).send({user: userStored});
                        }
                    }
                });
            }else{
                res.status(200).send({message : 'Introduce todos los campos'});
            }
        });
    }else{
        res.status(200).send({message : 'La contraseña es obligatoria'});
    }
}

function loginUser(req, res){
    //console.log('Got Body:', req.body);
    var params = req.body;
    var email = params.email;
    var password = params.password;
    

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({message : 'Error en la peticion '});
        }else{
            if(!user){
                res.status(404).send({message : 'No se encontro el usuario'});
            }else{
                bCrypt.compare(password , user.password, function(err, check){
                    if(check){
                        //devolver datos usuario logeado
                        if(params.gethash){
                            //devolver un token de jwt
                            //un token codificado en hash
                            //para todas las peticiones http
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message : 'Contraseña invalida'});
                    }
                });
            }
        }
    });
}

function updateUser(req, res){
    var userId = req.params.id;//se obtiene valor de la url
    var update = req.body;

    if(userId){
        return res.status(500).send({message : 'Error al actualizar el usuario'});
    }

    User.findByIdAndUpdate(userId, update,(err, userUpdated) => {
        if(err){
            res.status(500).send({message : 'Error al actualizar el usuario'});
        }else{
            if(!userUpdated){
                res.status(404).send({message : 'No se ha podido actualizar el usuario'});
            }else{
                res.status(200).send({user : userUpdated});
            }
        }
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function uploadImages(req,res){
    var userId = req.params.id;
    var fileName = 'No Subido...';

    if(req.files){
        var filePath = req.files.image.path;
        var filePathSplit = filePath.split('\\');
        fileName = filePathSplit[2];
        var fileExt = fileName.split('\.')[1];
        if(fileExt != 'png' && fileExt != 'jpg'){
            res.status(403).send({messages : 'La imagen no es un formato valido'});
        }
        User.findByIdAndUpdate(userId, {image: fileName},(err, userUpdate) => {
            if(err){
                res.status(500).send({messages : 'No se pudo actualizar imagen'});
            }else{
                if(!userUpdate){
                    res.status(404).send({message : 'No se ha podido actualizar el usuario'});
                }else{
                    res.status(200).send({user : userUpdate});
                }
            }
        });
    }else{
        res.status(200).send({messages : 'No se ha subido imagen'});
    }

}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/users/' + imageFile;
    fs.exists(pathFile, function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(404).send({message: 'No existe la imagen...'});
        }
    });
}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImages,
    getImageFile
};