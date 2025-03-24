const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configura o diretório público para servir os arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Configura o servidor para aceitar JSON
app.use(express.json());

// Endpoint para salvar a mensagem (simulação para teste)
app.post('/api/messages', (req, res) => {
    const { title, content, attachment } = req.body;

    // Aqui você pode armazenar a mensagem no banco de dados
    console.log("Mensagem recebida:", { title, content, attachment });

    res.status(200).send("Mensagem enviada com sucesso!");
});

// Roda o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
