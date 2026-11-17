
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const methodOverride = require('method-override');

dotenv.config();

const app = express();

// IMPORTAR ROTAS
const produtosRoutes = require('./routes/produtos');
const categoriasRoutes = require('./routes/categorias');
const fornecedoresRoutes = require('./routes/fornecedores');
const Produto = require('./models/produto');
const Categoria = require('./models/categoria');
const Fornecedor = require('./models/fornecedor');

// CONFIGURAÇÕES DO EXPRESS
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// ROTAS PRINCIPAIS
app.get('/', async (req, res) => {
    try {
        const totalProdutos = await Produto.countDocuments();
        const totalCategorias = await Categoria.countDocuments();
        const totalFornecedores = await Fornecedor.countDocuments();

        const estoqueBaixo = await Produto.countDocuments({
            $expr: {
                $lte: ['$quantidade', '$estoqueMinimo']
            }
        });

        res.render('layouts/dashboard', {
            totalProdutos,
            totalCategorias,
            totalFornecedores,
            estoqueBaixo
        });

    } catch (error) {
        res.status(500).send('Erro ao carregar o Dashboard: ' + error.message);
    }
});

// CONECTAR ROTAS DAS ENTIDADES
app.use('/produtos', produtosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/fornecedores', fornecedoresRoutes);

// CONEXÃO COM MONGODB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB conectado com sucesso!');

        app.listen(process.env.PORT || 3000, () => {
            console.log('StockManager iniciado!');
            console.log('Acesse: http://localhost:3000');
        });
    })
    .catch((error) => {
        console.error('Erro ao conectar ao MongoDB:', error);
    });
