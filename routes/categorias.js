
const express = require('express');
const router = express.Router();

const Categoria = require('../models/Categoria');

// LISTAR E PESQUISAR CATEGORIAS
router.get('/', async (req, res) => {
    try {
        const busca = req.query.busca || '';

        const categorias = await Categoria.find({
            nome: { $regex: busca, $options: 'i' }
        }).sort({ nome: 1 });

        res.render('categorias/index', { categorias, busca });

    } catch (error) {
        res.status(500).send('Erro ao listar categorias: ' + error.message);
    }
});

// FORMULÁRIO DE CADASTRO
router.get('/novo', (req, res) => {
    res.render('categorias/novo');
});

// CADASTRAR CATEGORIA
router.post('/', async (req, res) => {
    try {
        await Categoria.create(req.body);
        res.redirect('/categorias');

    } catch (error) {
        res.status(400).send('Erro ao cadastrar categoria: ' + error.message);
    }
});

// FORMULÁRIO DE EDIÇÃO
router.get('/:id/editar', async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);

        if (!categoria) {
            return res.status(404).send('Categoria não encontrada.');
        }

        res.render('categorias/editar', { categoria });

    } catch (error) {
        res.status(400).send('ID de categoria inválido.');
    }
});

// ATUALIZAR CATEGORIA
router.put('/:id', async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!categoria) {
            return res.status(404).send('Categoria não encontrada.');
        }

        res.redirect('/categorias');

    } catch (error) {
        res.status(400).send('Erro ao atualizar categoria: ' + error.message);
    }
});

// EXCLUIR CATEGORIA
router.delete('/:id', async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndDelete(req.params.id);

        if (!categoria) {
            return res.status(404).send('Categoria não encontrada.');
        }

        res.redirect('/categorias');

    } catch (error) {
        res.status(400).send('Erro ao excluir categoria: ' + error.message);
    }
});

module.exports = router;
