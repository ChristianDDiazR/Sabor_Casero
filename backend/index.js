var express = require('express');
const mc = require('./config/db');
const comentarioRoutes = require('./routes/comentarioRoutes')


var app = express();
//conectar bdd
mc.connect();
app.use(express.json());


//rutas
app.use('', comentarioRoutes); 

app.listen(2000, ()=>{
    console.log('Servidor expres corriendo en el puerto 2000');
});