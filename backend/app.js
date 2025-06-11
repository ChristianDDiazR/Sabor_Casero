const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mc = require('./config/db');

const comentarioRoutes = require('./routes/comentarioRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

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
app.use(bodyParser.json());
app.use(express.json());

// Rutas
app.use('', comentarioRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
