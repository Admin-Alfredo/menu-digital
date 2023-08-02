const mongoose = require('mongoose');
const db = require('../service/db')

const PedidoSchema = db.Schema({
    nome: String,
    cliente_ref: String,
    num_de_cliente: Number,
    pratos:[{
        type: mongoose.Schema.Types.ObjectId
    }]
})

module.exports = db.model('Pedido', PedidoSchema);