const express = require("express");
const { default: mongoose } = require("mongoose");
const Pedido = require('../models/Pedido');
const Mesa = require("../models/Mesa");
const routerPedido = express.Router()

routerPedido.get('/', async function (req, res) {
    const pedidos = await Pedido.find({});
    return res.status(200).json(pedidos)
})
routerPedido.get('/:id', async function (req, res) {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "ID invalido!" })
    try {
        const pedido = await Pedido.findById(req.params.id)
        return res.status(200).json({ message: "OK!", data: pedido })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})
routerPedido.post('/', async function (req, res) {
    const { nome, num_de_cliente } = req.body


    if (!nome)
        return res.status(400).json({ message: "defina o seu nome" })

    if (!num_de_cliente)
        return res.status(400).json({ message: "número de cliente invalido." })

    req.body.cliente_ref = req.cookies['CLIENT_KEY_RS']

    try {
        const pedido = await Pedido.create(req.body)
        return res.status(200).json({ message: "A pedido foi definida com sucesso!", data: pedido })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})
routerPedido.put('/:id', async function (req, res) {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "ID invalido!" })
    try {
        const pedidoUpdated = await Pedido.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).json({ message: "OK!", data: pedidoUpdated })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})


module.exports = app => app.use('/api/pedidos', routerPedido);
