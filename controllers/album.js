'use strict'

var fs = require('fs');//para trabajar con ficheros
var path = require('path');//para trabajar con rutas
var bCrypt = require('bcrypt-nodejs');
var Album = require('../models/album');
var Artist = require('../models/artist');
var Song = require('../models/song');
var jwt = require('../services/jwt');


function getAlbum(req, res) {
    var albumId = req.params.id;

    Album.findById(albumId).populate({path : 'artist'}).exec((err, album) => {
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!album){
                res.status(404).send({message:'El album no existe'});
            }else{
                res.status(200).send({album});
            }
        }
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function crearAlbum(req,res){
    var album = new Album();
    var params = req.body;
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;
    album.save((err, albumStore) => {
        if(err){
            res.status(500).send({message: 'Error al almacenar un album'});
        }else{
            if(!albumStore){
                res.status(404).send({message : 'No se almaceno el album'});
            }else{
                res.status(200).send({albumStore});
            }
        }
    });
}

function getAlbums(req,res){
    var artistId = req.params.artist;
    if(!artistId){
        //sacar todos los albumes
        //res.status().
        var find = Album.find({}).sort('title');

    }else{
        var find = Album.find({artist : artistId}).sort('year');
    }
    find.populate({path: 'artist'}).exec((err, albums) => {
        if(err){
            res.status(500).send({message : 'Ocurrio un error'});
        }else{
            if(!albums){
                res.status(404).send({message : 'El album no existe'});
            }else{
                res.status(200).send({albums});
            }
        }
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function actualizarAlbum(req, res){
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId,update, (err, albumUpdate) => {
        if(err){
            res.status(500).send({message : 'Ocurrio un error al actualizar album'});
        }else{
            if(!albumUpdate){
                res.status(404).send({message : 'El id del album no existe'});
            }else{
                res.status(200).send({albumUpdate});
            }
        }
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function deleteAlbum(req, res){
    var albumId = req.params.id;
    Album.findByIdAndDelete(albumId, (err, albumDelete) => {
        if(err){
            res.status(500).send({message : 'Error al eliminar album'});
        }else{
            if(!albumDelete){
                res.status(404).send({message: 'El album no existe'});
            }else{
                res.status(200).send({albumDelete});
            }
        }
    });
}

module.exports={
    getAlbum,
    crearAlbum,
    getAlbums,
    actualizarAlbum,
    deleteAlbum
}