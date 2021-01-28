'use strict'

var fs = require('fs');
var path = require('path');
var Artist = require('../models/artist');
var Song = require('../models/song');
var Album = require('../models/album');
var mongoosePaginate = require('mongoose-pagination');

function buscarUnArtista(req, res){
    var idArtist = req.params.id;
    Artist.findById(idArtist, (err, artistStore) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});        
        }else{
            if(!artistStore){
                res.status(404).send({message: 'Artista no existe'});
            }else{
                res.status(200).send({artist: artistStore});
            }
        }
    });
}

/**
 * Metod para obtener lista de artistas
 * con paginacion
 * @param {request} req 
 * @param {response} res 
 */
function getArtist(req, res) {
    var page = 1;
    if(req.params.page){
        page = req.params.page;
    }
    var itemsPerPage = 2;
    Artist.find().sort('name').paginate(page, itemsPerPage, (err,artistStore,total) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});        
        }else{
            if(!artistStore){
                res.status(404).send({message: 'No hay artistas'});
            }else{
                return res.status(200).send({
                    totalItems: total,
                    artist: artistStore
                });
            }
        }
    });
}

function saveArtist(req,res){
    var artist = new Artist();
    var params = req.body;
    if(params.name === undefined || params.description=== undefined){
        res.status(403).send({message: 'Los datos del artista son obligatorios'});
    }else{

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
}

function updateArtist(req, res) {
    var artistId = req.params.id;
    var update = req.body;
    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdate) => {
        if(err){
            res.status(500).send({message: 'Error al almacenar un artista'});
        }else{
            if(!artistUpdate){
                res.status(404).send({message: 'El artista no se ha actualizado'});
            }else{
                res.status(200).send({artist: artistUpdate});
            }
        }
    });
}

function deleteArtist(req, res) {
    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId, (err, artistRemove) => {
        if(err){
            res.status(500).send({message: 'Error al almacenar un artista'});
        }else{
            if(!artistRemove){
                res.status(404).send({message: 'El artista no se ha eliminado'});
            }else{
                console.log(artistRemove);
                Album.find({artst: artistRemove._id}).remove((err, albumRemove)=>{
                    if(err){
                        res.status(500).send({message: 'Error al almacenar un artista'});
                    }else{
                        if(!albumRemove){
                            res.status(404).send({message: 'El album no se ha eliminado'});
                        }else{
                            Song.find({album: albumRemove._id}).remove((err, songRemove) => {
                                if(err){
                                    res.status(500).send({message: 'Error al eliminar cancion'});
                                }else{
                                    if(!songRemove){
                                        res.status(404).send({message: 'La cancion no ha sido eliminada'});
                                    }else{
                                        res.status(200).send({message: artistRemove});
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}

function uploadImages(req,res){
    var artistId = req.params.id;
    var fileName = 'No Subido...';

    if(req.files){
        var filePath = req.files.image.path;
        var filePathSplit = filePath.replace(/\\/g, '/').split('/');
        fileName = filePathSplit.pop();
        var fileExt = fileName.split('\.')[1];
        if(fileExt != 'png' && fileExt != 'jpg'){
            res.status(403).send({messages : 'La imagen no es un formato valido'});
        }
        Artist.findByIdAndUpdate(artistId, {image: fileName},(err, artistUpdate) => {
            if(err){
                res.status(500).send({messages : 'No se pudo actualizar imagen'});
            }else{
                if(!artistUpdate){
                    res.status(404).send({message : 'No se ha podido actualizar el usuario'});
                }else{
                    res.status(200).send({artist : artistUpdate});
                }
            }
        });
    }else{
        res.status(200).send({messages : 'No se ha subido imagen'});
    }

}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/artists/' + imageFile;
    console.log(pathFile);
    fs.stat(pathFile, function(err, stats){
        if(err){
            console.log(err);
            res.status(404).send({message: 'No existe la imagen...'});
        }else{
            console.log(stats);
            res.sendFile(path.resolve(pathFile));
        }
    });
}

module.exports = {
    buscarUnArtista,
    saveArtist,
    getArtist,
    updateArtist,
    deleteArtist,
    uploadImages,
    getImageFile
}