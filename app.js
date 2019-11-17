/*se hace logica de express
*cargar ficheros de ruta
*body parser
*/

'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');
var song_routes = require('./routes/song');

app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());//lo que llega por post lo parsea a json


//configurar cabeceras http

//rutas base
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', song_routes);

/*app.get('/prueba', function(req,res){
    res.status(200).send({message: 'Bienvenido al curso UDEMY'});
});*/

//exportar el modulo

module.exports = app;