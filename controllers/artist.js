'use strict'

var fs = require('fs');
var path = require('path');
var Artist = require('../models/artist');
var Song = require('../models/song');
var Album = require('../models/album');

function buscarUnArtista(req, res){
    var idArtist = req.params.id;
    Artist.findById(idArtist, (err, artistStore) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});        
        }else{
            if(!artistStore){
                res.status(404).send({message: 'Artista no existe'});
            }else{
                res.status(200).send({message: artistStore});
            }
        }
    });
}

function saveArtist(req,res){
    var artist = new Artist();
    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';//params.image;
    artist.save((err, artistStore) => {
        if(err){
            res.status(500).send({message: 'Error al almacenar un artista'});
        }else{
            if(!artistStore){
                res.status(404).send({message: 'No se pudo almacenar el artista'});
            }else{
                res.status(200).send({artist: artistStore});
            }
        }
    });
}

module.exports = {
    buscarUnArtista,
    saveArtist
}