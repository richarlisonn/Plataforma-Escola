const express = require('express');
const cors = require('cors'); 
const multer = require('multer');
const path = require('path');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Configurar armazenamento de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Rota para envio de mensagens pelo ADM
app.post('/api/messages', upload.single('attachment'), (req, res) => {
    const { title, content } = req.body;
    const attachment = req.file ? `/uploads/${req.file.filename}` : null;

    db.run('INSERT INTO messages (title, content, attachment) VALUES (?, ?, ?)',
        [title, content, attachment],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Mensagem enviada com sucesso!" });
        }
    );
});

// Rota para listar mensagens para os usuários
app.get('/api/messages', (req, res) => {
    db.all('SELECT * FROM messages', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.delete('/api/messages/:id', (req, res) => {
    const messageId = req.params.id;

    db.run('DELETE FROM messages WHERE id = ?', [messageId], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: "Mensagem apagada com sucesso!" });
    });
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
