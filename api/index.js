'use strict'//para usar instrucciones de nuevo estandar JS

var mongoose = require('mongoose');//para usar la libreria de mongoose
var app = require('./app');
var port = process.env.PORT || 3977;

//conexion directa a mongoDB
mongoose.Promise = global.Promise;
//se envia como parametro la URL de la BD

mongoose.connect('mongodb://127.0.0.1:27017/curso_mean2',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("La base de datos se ha conectado...");
    app.listen(port, function(){
        console.log('Servidor api rest de musica escuchando en http://localhost:' + port);
    });
});
