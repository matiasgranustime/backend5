
const mongoose = require('mongoose');

const fornecedorSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: [true, 'O nome do fornecedor é obrigatório'],
        trim: true
    },

    cnpj: {
        type: String,
        trim: true,
        unique: true,
        sparse: true
    },

    telefone: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        trim: true,
        lowercase: true
    },

    endereco: {
        type: String,
        trim: true
    },

    cidade: {
        type: String,
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

module.exports = mongoose.model('Fornecedor', fornecedorSchema);
