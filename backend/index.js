var express = require('express');
const cors = require('cors');
const mc = require('./config/db');
const comentarioRoutes = require('./routes/comentarioRoutes')
var app = express();

//conectar bdd
mc.connect();

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());//middleware para usar json
//rutas
app.use('', comentarioRoutes); 

app.listen(2000, ()=>{
    console.log('Servidor expres corriendo en el puerto 2000');
});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/api/usuarios', usuarioRoutes);

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor backend corriendo en http://localhost:3000');
});
