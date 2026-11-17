
const express = require('express');
const router = express.Router();

const Produto = require('../models/produto');

// LISTAR PRODUTOS E PESQUISAR
router.get('/', async (req, res) => {
    try {
        const busca = req.query.busca || '';

        const produtos = await Produto.find({
            $or: [
                { nome: { $regex: busca, $options: 'i' } },
                { codigo: { $regex: busca, $options: 'i' } },
                { categoria: { $regex: busca, $options: 'i' } }
            ]
        }).sort({ nome: 1 });

        res.render('produtos/index', {
            produtos,
            busca
        });

    } catch (error) {
        res.status(500).send('Erro ao listar produtos: ' + error.message);
    }
});

// FORMULÁRIO DE CADASTRO
router.get('/novo', (req, res) => {
    res.render('produtos/novo');
});

// CADASTRAR PRODUTO
router.post('/', async (req, res) => {
    try {
        await Produto.create(req.body);
        res.redirect('/produtos');

    } catch (error) {
        res.status(400).send('Erro ao cadastrar produto: ' + error.message);
    }
});

// FORMULÁRIO DE EDIÇÃO
router.get('/:id/editar', async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);

        if (!produto) {
            return res.status(404).send('Produto não encontrado.');
        }

        res.render('produtos/editar', { produto });

    } catch (error) {
        res.status(400).send('ID de produto inválido.');
    }
});

// ATUALIZAR PRODUTO
router.put('/:id', async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!produto) {
            return res.status(404).send('Produto não encontrado.');
        }

        res.redirect('/produtos');

    } catch (error) {
        res.status(400).send('Erro ao atualizar produto: ' + error.message);
    }
});

// EXCLUIR PRODUTO
router.delete('/:id', async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);

        if (!produto) {
            return res.status(404).send('Produto não encontrado.');
        }

        res.redirect('/produtos');

    } catch (error) {
        res.status(400).send('Erro ao excluir produto: ' + error.message);
    }
});

module.exports = router;
