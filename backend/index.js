var express = require('express');
const mc = require('./config/db');


var app = express();
//conectar bdd
mc.connect();

app.listen(2000, ()=>{
    console.log('Servidor expres corriendo en el puerto 2000');
});