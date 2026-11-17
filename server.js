
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const methodOverride = require('method-override');

dotenv.config();

const app = express();

// Configurações
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Página inicial provisória
app.get('/', (req, res) => {
    res.send('StockManager - Sistema de Gestão de Estoque funcionando!');
});

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB conectado com sucesso!');

        app.listen(process.env.PORT || 3000, () => {
            console.log('Servidor iniciado na porta 3000');
        });
    })
    .catch((error) => {
        console.error('Erro ao conectar ao MongoDB:', error);
    });
