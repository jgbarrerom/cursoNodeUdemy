'use strict'//para usar instrucciones de nuevo estadr JS

var mongoose = require('mongoose');//para usar la libreria de mongoose
var app = require('./app');
var port = process.env.PORT || 3977;

//conexion directa a mongoDB
mongoose.Promise = global.Promise;
//se envia como parametro la URL de la BD
mongoose.connect('mongodb://localhost:27017/curso_mean2',(err,res) => {
    if(err){
        throw err;
    }else{
        console.log("La base de datos se ha conectado...");
        app.listen(port, function(){
            console.log('Servidor api rest de musica escuchando en http://localhost:' + port);
        });
    }
});