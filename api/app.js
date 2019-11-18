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

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Autorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');  

    next();
});

/*app.get('/prueba', function(req,res){
    res.status(200).send({message: 'Bienvenido al curso UDEMY'});
});*/

//exportar el modulo

module.exports = app;