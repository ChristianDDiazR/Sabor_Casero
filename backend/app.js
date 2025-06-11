const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

// Middlewares
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // deja vacío si usas XAMPP sin contraseña
  database: 'sabor_casero'
});

db.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});
//RECETAS
// Ruta listar recetas
app.get('/listar/recetas', (req, res) => {
  const query = `
    SELECT r.*, u.nombre_usuario, c.nombre_categoria 
    FROM RECETA r
    JOIN USUARIO u ON r.id_usuarioReceta = u.id_usuario
    JOIN CATEGORIA c ON r.id_categoria = c.id_categoria
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener recetas:', err);
      res.status(500).json({ error: 'Error al obtener recetas' });
    } else {
      res.json(results);
    }
  });
});

// Ruta bucar recetas por nombre y/o filtro de categoría
app.get('/buscar/recetas', (req, res) => {
  const { q, categoria, mundo, momento, dia, tipo } = req.query;

  let query = `
    SELECT r.*, u.nombre_usuario, c.nombre_categoria 
    FROM RECETA r
    JOIN USUARIO u ON r.id_usuarioReceta = u.id_usuario
    JOIN CATEGORIA c ON r.id_categoria = c.id_categoria
    WHERE 1 = 1
  `;

  const params = [];

  if (q) {
    query += ` AND r.descripcion LIKE ?`;
    params.push(`%${q}%`);
  }

  if (categoria) {
    query += ` AND c.nombre_categoria = ?`;
    params.push(categoria);
  }

  // Agrega filtros adicionales si los tienes en la BDD:
  // if (mundo) {...}
  // if (momento) {...}
  // if (dia) {...}
  // if (tipo) {...}

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error al buscar recetas:', err);
      res.status(500).json({ error: 'Error al buscar recetas' });
    } else {
      res.json(results);
    }
  });
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
