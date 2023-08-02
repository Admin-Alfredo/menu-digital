const { default: mongoose } = require('mongoose')
const db = require('../service/db')

const MesaSchema = db.Schema({
    referencia: Number,
    num_de_cadeira: Number,
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
    },
    ocupado: {
        type: Boolean,
        default: false
    }
})
module.exports = db.model('Mesa', MesaSchema)