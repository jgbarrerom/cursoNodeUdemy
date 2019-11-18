'use strict'

var fs = require('fs');//para trabajar con ficheros
var path = require('path');//para trabajar con rutas
var bCrypt = require('bcrypt-nodejs');
var Album = require('../models/album');
var Artist = require('../models/artist');
var Song = require('../models/song');
var jwt = require('../services/jwt');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function getSong(req,res){
    var songId = req.params.id;

    Song.findById(songId).populate({path: 'album'}).exec((err, songStore) => {
        if(err){
            res.status(500).send({message : 'Error al obtener la cancion'});
        }else{
            if(!songStore){
                res.status(404).send({message : 'La cancion no existe'});
            }else{
                res.status(200).send({songStore});
            }
        }
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function getSongs(req, res){
    var albumId = req.params.album;
    if(!albumId){
        var find = Song.find({}).sort('number');
    }else{
        var find = Song.find({album: albumId}).sort('number');
    }
    find.populate({
        path: 'album', 
        populate: {
            path: 'artist',
            model: 'Artist'
        }
    }).exec((err, songs) => {
        if(err){
            res.status(500).send({message : 'Error al obtener la cancion'});
        }else{
            if(!songs){
                res.status(404).send({message : 'La cancion no existe'});
            }else{
                res.status(200).send({songs});
            }
        }
    });

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function saveSong(req,res){
    var song = new Song();
    var params = req.body;

    song.name = params.name;
    song.duration = params.duration;
    song.file = null;
    song.album = params.album;

    song.save((err, songStore) => {
        if(err){
            res.status(500).send({message : 'Ocurrio un error al guardar cancion'});
        }else{
            if(!songStore){
                res.status(404).send({message : 'No se almaceno la cancion'});
            }else{
                res.status(200).send({songStore});
            }
        }
    });
}

function updateSong(req,res){

}

function deleteSong(req, res){
    
}


module.exports = {
    getSong,
    saveSong,
    getSongs
}