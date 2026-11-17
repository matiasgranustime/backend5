
const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: [true, 'O código do produto é obrigatório'],
        unique: true,
        trim: true
    },

    nome: {
        type: String,
        required: [true, 'O nome do produto é obrigatório'],
        trim: true
    },

    descricao: {
        type: String,
        trim: true
    },

    categoria: {
        type: String,
        trim: true
    },

    fornecedor: {
        type: String,
        trim: true
    },

    quantidade: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },

    estoqueMinimo: {
        type: Number,
        min: 0,
        default: 5
    },

    precoCompra: {
        type: Number,
        required: true,
        min: 0
    },

    precoVenda: {
        type: Number,
        required: true,
        min: 0
    },

    unidade: {
        type: String,
        default: 'Unidade',
        trim: true
    },

    status: {
        type: String,
        enum: ['Ativo', 'Inativo'],
        default: 'Ativo'
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Produto', produtoSchema);
