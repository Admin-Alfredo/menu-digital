const { default: mongoose } = require('mongoose');
const db = require('../service/db')

const PratoSchema = db.Schema({
    nome: String,
    preco: Number,
    quantidade: Number,
    url_image: {
        type: String,
        default: '/public/imagens/prato.png'
    },
    disponivel: {
        type: Boolean,
        default: true
    }
})
module.exports = db.model('Prato', PratoSchema);