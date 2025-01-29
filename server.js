const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const FILE_PATH = './clients.json';

// Leer clientes del archivo
app.get('/clients', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }
        res.json(JSON.parse(data || '[]'));
    });
});

// Guardar nuevo cliente
app.post('/clients', (req, res) => {
    const newClient = req.body;

    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        let clients = [];
        if (!err && data) {
            clients = JSON.parse(data);
        }

        newClient.id = clients.length + 1;
        clients.push(newClient);

        fs.writeFile(FILE_PATH, JSON.stringify(clients, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al guardar el cliente' });
            }
            res.json(newClient);
        });
    });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
