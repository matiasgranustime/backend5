
const express = require('express');
const router = express.Router();

const Fornecedor = require('../models/Fornecedor');

// LISTAR E PESQUISAR FORNECEDORES
router.get('/', async (req, res) => {
    try {
        const busca = req.query.busca || '';

        const fornecedores = await Fornecedor.find({
            $or: [
                { nome: { $regex: busca, $options: 'i' } },
                { cnpj: { $regex: busca, $options: 'i' } },
                { email: { $regex: busca, $options: 'i' } }
            ]
        }).sort({ nome: 1 });

        res.render('fornecedores/index', { fornecedores, busca });

    } catch (error) {
        res.status(500).send('Erro ao listar fornecedores: ' + error.message);
    }
});

// FORMULÁRIO DE CADASTRO
router.get('/novo', (req, res) => {
    res.render('fornecedores/novo');
});

// CADASTRAR FORNECEDOR
router.post('/', async (req, res) => {
    try {
        await Fornecedor.create(req.body);
        res.redirect('/fornecedores');

    } catch (error) {
        res.status(400).send('Erro ao cadastrar fornecedor: ' + error.message);
    }
});

// FORMULÁRIO DE EDIÇÃO
router.get('/:id/editar', async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findById(req.params.id);

        if (!fornecedor) {
            return res.status(404).send('Fornecedor não encontrado.');
        }

        res.render('fornecedores/editar', { fornecedor });

    } catch (error) {
        res.status(400).send('ID de fornecedor inválido.');
    }
});

// ATUALIZAR FORNECEDOR
router.put('/:id', async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!fornecedor) {
            return res.status(404).send('Fornecedor não encontrado.');
        }

        res.redirect('/fornecedores');

    } catch (error) {
        res.status(400).send('Erro ao atualizar fornecedor: ' + error.message);
    }
});

// EXCLUIR FORNECEDOR
router.delete('/:id', async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findByIdAndDelete(req.params.id);

        if (!fornecedor) {
            return res.status(404).send('Fornecedor não encontrado.');
        }

        res.redirect('/fornecedores');

    } catch (error) {
        res.status(400).send('Erro ao excluir fornecedor: ' + error.message);
    }
});

module.exports = router;
