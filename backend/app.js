const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mc = require('./config/db');

const comentarioRoutes = require('./routes/comentarioRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

// Conectar a la base de datos
mc.connect();

// Configuración de CORS
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middlewares
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());

// Rutas Comentarios
app.use('', comentarioRoutes);
//Rutas Usuarios
app.use('/api/usuarios', usuarioRoutes);
// Rutas Recetas
app.use('/listar/recetas', recipeRoutes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
