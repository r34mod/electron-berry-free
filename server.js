const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/imagenes', express.static(path.join(__dirname, 'public/imagenes')));

const FILE_PATH = './clients.json';

const FILE_PROFIT_PATH = './profit.json';

const FILE_EXPENSES_PATH = './expenses.json';


// Configuración de multer para almacenar imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.body.userId;
        const userDir = path.join(__dirname, 'public/imagenes', userId);
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }
        cb(null, userDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

// Endpoint para subir imágenes
app.post('/upload', upload.single('image'), (req, res) => {
    console.log('Archivo recibido:', req.file);
    console.log('Datos recibidos:', req.body);

    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo' });
    }

    res.json({ message: 'Imagen subida con éxito', filePath: req.file.path });
});

// Endpoint para obtener imágenes de un usuario
app.get('/imagenes/:userId', (req, res) => {
    const userId = req.params.userId;
    const userDir = path.join(__dirname, 'public/imagenes', userId);

    if (!fs.existsSync(userDir)) {
        return res.json([]);
    }

    fs.readdir(userDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer imágenes' });
        }
        res.json(files);
    });
});

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



app.get('/clients/:id', (req, res) => {
    const clientId = parseInt(req.params.id);

    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }

        const clients = JSON.parse(data || '[]');
        const client = clients.find(c => c.id === clientId);

        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.json(client);
    });
});


// Agregar beneficio
app.post('/profit', (req, res) => {
    const newProfit = req.body;
    fs.readFile(FILE_PROFIT_PATH, 'utf8', (err, data) => {
        let profits = [];
        if (!err && data) {
            profits = JSON.parse(data);
        }
        profits.push(newProfit);
        fs.writeFile(FILE_PROFIT_PATH, JSON.stringify(profits, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al guardar el beneficio' });
            }
            res.json(newProfit);
        });
    });
});


app.get('/profit', (req, res) => {
    fs.readFile(FILE_PROFIT_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }
        res.json(JSON.parse(data || '[]'));
    });
});

// Obtener beneficios por mes
app.get('/profit/:month', (req, res) => {
    const month = req.params.month;
    fs.readFile(FILE_PROFIT_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer los beneficios' });
        }
        const profits = JSON.parse(data || '[]');
        const filteredProfits = profits.filter(p => p.month === month);
        res.json(filteredProfits);
    });
});

// Agregar gasto
app.post('/expenses', (req, res) => {
    const newExpense = req.body;
    fs.readFile(FILE_EXPENSES_PATH, 'utf8', (err, data) => {
        let expenses = [];
        if (!err && data) {
            expenses = JSON.parse(data);
        }
        expenses.push(newExpense);
        fs.writeFile(FILE_EXPENSES_PATH, JSON.stringify(expenses, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al guardar el gasto' });
            }
            res.json(newExpense);
        });
    });
});

// Obtener todos los gastos
app.get('/expenses', (req, res) => {
    fs.readFile(FILE_EXPENSES_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }
        res.json(JSON.parse(data || '[]'));
    });
});

// Obtener gastos por mes
app.get('/expenses/:month', (req, res) => {
    const month = req.params.month;
    fs.readFile(FILE_EXPENSES_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer los gastos' });
        }
        const expenses = JSON.parse(data || '[]');
        const filteredExpenses = expenses.filter(e => e.month === month);
        res.json(filteredExpenses);
    });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
